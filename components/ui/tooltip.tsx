"use client";

interface TooltipProps {
  className?: string;
}

export function Tooltip({ className }: TooltipProps) {
  return (
    <div className={className}>
      {/* TODO: implement Tooltip */}
      <span className="text-sm text-muted-foreground">Tooltip (stub)</span>
    </div>
  );
}

export default Tooltip;
