"use client";

interface DialogProps {
  className?: string;
}

export function Dialog({ className }: DialogProps) {
  return (
    <div className={className}>
      {/* TODO: implement Dialog */}
      <span className="text-sm text-muted-foreground">Dialog (stub)</span>
    </div>
  );
}

export default Dialog;
