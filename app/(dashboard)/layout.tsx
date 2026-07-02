"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  BarChart3,
  Play,
  LayoutTemplate,
  Settings,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react";
import { navigation } from "@/config/navigation";
import { useTheme } from "@/app/providers";

const ICONS = {
  "layout-dashboard": LayoutDashboard,
  "file-text": FileText,
  "flask-conical": FlaskConical,
  "bar-chart-3": BarChart3,
  play: Play,
  "layout-template": LayoutTemplate,
  settings: Settings,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(64);
  const [isResizing, setIsResizing] = useState(false);
  const expanded = isHovered;

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.min(200, Math.max(64, event.clientX));
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => setIsResizing(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) return;

    const timer = window.setTimeout(() => {
      if (!isHovered) {
        setSidebarWidth(64);
      }
    }, 180);

    return () => window.clearTimeout(timer);
  }, [isHovered, isResizing]);

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ width: `${expanded ? Math.max(sidebarWidth, 160) : 64}px`, minWidth: `${expanded ? Math.max(sidebarWidth, 160) : 64}px` }}
        className="relative flex h-screen shrink-0 flex-col justify-between overflow-hidden border-r border-[var(--border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-sm shadow-black/5 transition-[width] duration-300 ease-out"
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-center px-3 py-4">
            <Link href="/" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>

          <nav className="mt-2 flex flex-col items-center gap-1 px-3">
            {navigation.map((item) => {
              const Icon = ICONS[item.icon];
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                    active
                      ? "bg-[var(--sidebar-hover)] text-[var(--sidebar-foreground)] shadow-sm"
                      : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-foreground)]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                        : "bg-[var(--sidebar-hover)] text-[var(--sidebar-muted)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span
                    className={`truncate transition-all duration-200 ${
                      expanded ? "max-w-[180px] translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div
          role="separator"
          aria-label="Resize sidebar"
          onMouseDown={() => setIsResizing(true)}
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize"
        />

        <div className="border-t border-white/10 px-3 py-3">
          <Link
            href="/settings"
            className={`flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
              pathname === "/settings" || pathname.startsWith("/settings/")
                ? "bg-[var(--sidebar-hover)] text-[var(--sidebar-foreground)]"
                : "text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-foreground)]"
            }`}
          >
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
              pathname === "/settings" || pathname.startsWith("/settings/")
                ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                : "bg-[var(--sidebar-hover)] text-[var(--sidebar-muted)]"
            }`}>
              <Settings className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6">
          <span className="text-sm text-[var(--muted)]">Workspace</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition hover:bg-[var(--sidebar-hover)]"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/10 text-sm font-medium text-[var(--accent)]">
              ?
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[var(--background)]">
          {children}
        </main>
      </div>
    </div>
  );
}