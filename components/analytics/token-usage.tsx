"use client";

interface TokenUsageProps {
  className?: string;
}

export function TokenUsage({ className }: TokenUsageProps) {
  return (
    <div className={className}>
      {/* TODO: implement TokenUsage */}
      <span className="text-sm text-muted-foreground">TokenUsage (stub)</span>
    </div>
  );
}

export default TokenUsage;