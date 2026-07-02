"use client";

interface EmptyStateProps {
  className?: string;
}

export function EmptyState({ className }: EmptyStateProps) {
  return (
    <div className={className}>
      {/* TODO: implement EmptyState */}
      <span className="text-sm text-muted-foreground">EmptyState (stub)</span>
    </div>
  );
}

export default EmptyState;
