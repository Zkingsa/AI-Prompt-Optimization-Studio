"use client";

interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div className={className}>
      {/* TODO: implement Separator */}
      <span className="text-sm text-muted-foreground">Separator (stub)</span>
    </div>
  );
}

export default Separator;
