"use client";

interface ScrollAreaProps {
  className?: string;
}

export function ScrollArea({ className }: ScrollAreaProps) {
  return (
    <div className={className}>
      {/* TODO: implement ScrollArea */}
      <span className="text-sm text-muted-foreground">ScrollArea (stub)</span>
    </div>
  );
}

export default ScrollArea;
