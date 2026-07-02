"use client";

interface CopyButtonProps {
  className?: string;
}

export function CopyButton({ className }: CopyButtonProps) {
  return (
    <div className={className}>
      {/* TODO: implement CopyButton */}
      <span className="text-sm text-muted-foreground">CopyButton (stub)</span>
    </div>
  );
}

export default CopyButton;
