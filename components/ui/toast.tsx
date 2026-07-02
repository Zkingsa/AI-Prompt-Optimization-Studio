"use client";

interface ToastProps {
  className?: string;
}

export function Toast({ className }: ToastProps) {
  return (
    <div className={className}>
      {/* TODO: implement Toast */}
      <span className="text-sm text-muted-foreground">Toast (stub)</span>
    </div>
  );
}

export default Toast;
