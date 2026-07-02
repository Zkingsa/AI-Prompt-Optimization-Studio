import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  FlaskConical,
  BarChart3,
  Play,
  LayoutTemplate,
  Settings,
} from "lucide-react";
import { navigation } from "@/config/navigation";

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
  return (
    <div className="flex min-h-screen">
      <aside className="flex w-60 flex-col justify-between bg-[var(--sidebar)] text-[var(--sidebar-foreground)]">
        <div>
          <div className="px-5 py-5">
            <span className="text-sm font-semibold tracking-tight">
              Prompt Studio
            </span>
          </div>
          <nav className="flex flex-col gap-0.5 px-3">
            {navigation.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-[var(--sidebar-muted)] hover:bg-white/5 hover:text-[var(--sidebar-foreground)]"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="border-t border-white/10 px-3 py-3">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-[var(--sidebar-muted)] hover:bg-white/5 hover:text-[var(--sidebar-foreground)]"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--card)] px-6">
          <span className="text-sm text-[var(--muted)]">Workspace</span>
          <div className="h-8 w-8 rounded-full bg-[var(--accent)]/10 text-center text-sm leading-8 text-[var(--accent)]">
            ?
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-[var(--background)]">
          {children}
        </main>
      </div>
    </div>
  );
}