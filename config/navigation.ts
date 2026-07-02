export interface NavItem {
  label: string;
  href: string;
  icon: "layout-dashboard" | "file-text" | "flask-conical" | "bar-chart-3" | "play" | "layout-template" | "settings";
}

export const navigation: NavItem[] = [
  { label: "Overview", href: "/", icon: "layout-dashboard" },
  { label: "Prompts", href: "/prompts", icon: "file-text" },
  { label: "Test suites", href: "/test-suites", icon: "flask-conical" },
  { label: "Analytics", href: "/analytics", icon: "bar-chart-3" },
  { label: "Playground", href: "/playground", icon: "play" },
  { label: "Templates", href: "/templates", icon: "layout-template" },
];

export const settingsNavigation: NavItem[] = [
  { label: "General", href: "/settings", icon: "settings" },
  { label: "API keys", href: "/settings/api-keys", icon: "settings" },
  { label: "Team", href: "/settings/team", icon: "settings" },
];

export default navigation;
