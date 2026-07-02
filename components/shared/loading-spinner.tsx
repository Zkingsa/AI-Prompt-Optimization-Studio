"use client";

interface LoadingSpinnerProps {
  className?: string;
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={className}>
      {/* TODO: implement LoadingSpinner */}
      <span className="text-sm text-muted-foreground">LoadingSpinner (stub)</span>
    </div>
  );
}

export default LoadingSpinner;
