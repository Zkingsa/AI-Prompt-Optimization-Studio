"use client";

interface ErrorBoundaryProps {
  className?: string;
}

export function ErrorBoundary({ className }: ErrorBoundaryProps) {
  return (
    <div className={className}>
      {/* TODO: implement ErrorBoundary */}
      <span className="text-sm text-muted-foreground">ErrorBoundary (stub)</span>
    </div>
  );
}

export default ErrorBoundary;
