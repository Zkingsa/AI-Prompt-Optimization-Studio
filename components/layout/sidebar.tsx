"use client";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={className}>
      {/* TODO: implement Sidebar */}
      <span className="text-sm text-muted-foreground">Sidebar (stub)</span>
    </div>
  );
}

export default Sidebar;
