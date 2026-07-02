"use client";

interface ButtonProps {
  className?: string;
}

export function Button({ className }: ButtonProps) {
  return (
    <div className={className}>
      {/* TODO: implement Button */}
      <span className="text-sm text-muted-foreground">Button (stub)</span>
    </div>
  );
}

export default Button;
