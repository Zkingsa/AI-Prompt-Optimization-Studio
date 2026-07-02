"use client";

interface PlaygroundProps {
  className?: string;
}

export function Playground({ className }: PlaygroundProps) {
  return (
    <div className={className}>
      {/* TODO: implement Playground */}
      <span className="text-sm text-muted-foreground">Playground (stub)</span>
    </div>
  );
}

export default Playground;
