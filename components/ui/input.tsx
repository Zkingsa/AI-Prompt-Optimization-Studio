"use client";

interface InputProps {
  className?: string;
}

export function Input({ className }: InputProps) {
  return (
    <div className={className}>
      {/* TODO: implement Input */}
      <span className="text-sm text-muted-foreground">Input (stub)</span>
    </div>
  );
}

export default Input;
