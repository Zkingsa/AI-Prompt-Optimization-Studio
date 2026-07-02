"use client";

interface DiffViewerProps {
  className?: string;
}

export function DiffViewer({ className }: DiffViewerProps) {
  return (
    <div className={className}>
      {/* TODO: implement DiffViewer */}
      <span className="text-sm text-muted-foreground">DiffViewer (stub)</span>
    </div>
  );
}

export default DiffViewer;
