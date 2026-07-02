"use client";

interface AbTestPanelProps {
  className?: string;
}

export function AbTestPanel({ className }: AbTestPanelProps) {
  return (
    <div className={className}>
      {/* TODO: implement AbTestPanel */}
      <span className="text-sm text-muted-foreground">AbTestPanel (stub)</span>
    </div>
  );
}

export default AbTestPanel;
