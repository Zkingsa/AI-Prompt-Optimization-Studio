"use client";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <div className={className}>
      {/* TODO: implement Header */}
      <span className="text-sm text-muted-foreground">Header (stub)</span>
    </div>
  );
}

export default Header;
