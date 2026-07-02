"use client";

interface ModelCardProps {
  className?: string;
}

export function ModelCard({ className }: ModelCardProps) {
  return (
    <div className={className}>
      {/* TODO: implement ModelCard */}
      <span className="text-sm text-muted-foreground">ModelCard (stub)</span>
    </div>
  );
}

export default ModelCard;
