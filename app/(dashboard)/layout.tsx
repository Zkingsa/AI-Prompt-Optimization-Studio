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
  Menu,
  X,
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
  const [sidebarWidth, setSidebarWidth] = useState(88);
  const [isResizing, setIsResizing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const expanded = !isMobile && isHovered;
  const showText = expanded || isMobile;

  useEffect(() => {
    const updateViewport = () => {
      const nextMobile = window.innerWidth < 768;
      setIsMobile(nextMobile);
      if (!nextMobile) {
        setIsMobileMenuOpen(false);
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    if (!isResizing || isMobile) return;

    const handleMouseMove = (event: MouseEvent) => {
      const nextWidth = Math.min(240, Math.max(64, event.clientX - 8));
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
    if (isResizing || isMobile) return;

    const timer = window.setTimeout(() => {
      if (!isHovered) {
        setSidebarWidth(88);
      }
    }, 180);

    return () => window.clearTimeout(timer);
  }, [isHovered, isResizing, isMobile]);

  const asideWidth = isMobile ? (isMobileMenuOpen ? 280 : 0) : expanded ? Math.max(sidebarWidth, 88) : 64;
  const contentOffset = isMobile ? 0 : asideWidth;

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {isMobile && (
        <div
          className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        style={{ width: `${asideWidth}px`, minWidth: `${asideWidth}px` }}
        className={`fixed left-0 top-0 z-40 flex h-screen shrink-0 flex-col justify-between overflow-y-auto border-r border-[var(--border)] bg-[var(--sidebar)] text-[var(--sidebar-foreground)] shadow-sm shadow-black/5 transition-all duration-300 ease-out ${isMobile ? (isMobileMenuOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}`}
      >
        {isMobile && (
          <div className="flex justify-end px-3 pt-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
              aria-label="Close navigation"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="flex flex-col">
          <div className="flex items-center justify-start px-2 py-4">
            <Link href="/" className="flex items-center gap-2 rounded-xl px-2 py-2 text-[var(--accent)] transition-colors hover:bg-[var(--sidebar-hover)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)]/15">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className={`flex min-w-0 flex-col truncate text-[clamp(0.75rem,1.2vw,1rem)] font-semibold leading-tight transition-[max-width,opacity,transform] duration-300 ease-out ${showText ? "max-w-[180px] translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"}`}>
                <span className="truncate text-[var(--foreground)]">Prompt Optimization</span>
                <span className="truncate text-black dark:text-white">Studio</span>
              </span>
            </Link>
          </div>

          <nav className="mt-2 flex flex-col gap-1 px-3">
            {navigation.map((item) => {
              const Icon = ICONS[item.icon];
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                  className={`flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-all duration-300 ease-out ${isMobile || expanded ? "justify-start" : "justify-center"} ${
                    active
                      ? "bg-[var(--sidebar-hover)] text-[var(--sidebar-foreground)]"
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
                    className={`ml-2 truncate transition-[max-width,opacity,transform] duration-300 ease-out ${
                      showText ? "max-w-[180px] translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {!isMobile && (
          <div
            role="separator"
            aria-label="Resize sidebar"
            onMouseDown={() => setIsResizing(true)}
            className="absolute right-0 top-0 h-full w-2 cursor-ew-resize"
          />
        )}

        <div className="border-t border-white/10 px-2 py-3">
          <Link
            href="/settings"
            onClick={() => isMobile && setIsMobileMenuOpen(false)}
            className={`flex w-full items-center justify-start rounded-xl px-2 py-2.5 text-sm transition-all duration-300 ease-out ${
              pathname === "/settings" || pathname.startsWith("/settings/")
                ? "text-[var(--sidebar-foreground)]"
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
            <span
              className={`ml-2 truncate text-[clamp(0.7rem,1.2vw,0.95rem)] transition-[max-width,opacity,transform] duration-300 ease-out sm:text-sm ${
                showText ? "max-w-[180px] translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"
              }`}
            >
              Settings
            </span>
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col" style={{ paddingLeft: `${contentOffset}px` }}>
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-4 sm:px-6">
          <div className="flex items-center gap-2">
            {isMobile && (
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((value) => !value)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]"
                aria-label="Toggle navigation"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            )}
            <span className="text-sm text-[var(--muted)]">Workspace</span>
          </div>
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