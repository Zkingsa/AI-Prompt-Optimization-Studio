"use client";

interface SuggestionPanelProps {
  className?: string;
}

export function SuggestionPanel({ className }: SuggestionPanelProps) {
  return (
    <div className={className}>
      {/* TODO: implement SuggestionPanel */}
      <span className="text-sm text-muted-foreground">SuggestionPanel (stub)</span>
    </div>
  );
}

export default SuggestionPanel;
