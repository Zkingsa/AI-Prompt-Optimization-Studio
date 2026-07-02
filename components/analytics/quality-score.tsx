"use client";

interface QualityScoreProps {
  className?: string;
}

export function QualityScore({ className }: QualityScoreProps) {
  return (
    <div className={className}>
      {/* TODO: implement QualityScore */}
      <span className="text-sm text-muted-foreground">QualityScore (stub)</span>
    </div>
  );
}

export default QualityScore;