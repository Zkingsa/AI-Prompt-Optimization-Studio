"use client";

interface VersionBadgeProps {
  className?: string;
}

export function VersionBadge({ className }: VersionBadgeProps) {
  return (
    <div className={className}>
      {/* TODO: implement VersionBadge */}
      <span className="text-sm text-muted-foreground">VersionBadge (stub)</span>
    </div>
  );
}

export default VersionBadge;
