"use client";

interface BadgeProps {
  className?: string;
}

export function Badge({ className }: BadgeProps) {
  return (
    <div className={className}>
      {/* TODO: implement Badge */}
      <span className="text-sm text-muted-foreground">Badge (stub)</span>
    </div>
  );
}

export default Badge;
