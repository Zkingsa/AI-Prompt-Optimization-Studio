"use client";

interface TextareaProps {
  className?: string;
}

export function Textarea({ className }: TextareaProps) {
  return (
    <div className={className}>
      {/* TODO: implement Textarea */}
      <span className="text-sm text-muted-foreground">Textarea (stub)</span>
    </div>
  );
}

export default Textarea;
