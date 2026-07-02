"use client";

interface ProviderBadgeProps {
  className?: string;
}

export function ProviderBadge({ className }: ProviderBadgeProps) {
  return (
    <div className={className}>
      {/* TODO: implement ProviderBadge */}
      <span className="text-sm text-muted-foreground">ProviderBadge (stub)</span>
    </div>
  );
}

export default ProviderBadge;
