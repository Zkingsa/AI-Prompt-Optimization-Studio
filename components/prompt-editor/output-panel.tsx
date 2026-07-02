"use client";

interface OutputPanelProps {
  className?: string;
}

export function OutputPanel({ className }: OutputPanelProps) {
  return (
    <div className={className}>
      {/* TODO: implement OutputPanel */}
      <span className="text-sm text-muted-foreground">OutputPanel (stub)</span>
    </div>
  );
}

export default OutputPanel;
