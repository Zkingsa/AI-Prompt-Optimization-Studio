"use client";

interface EditorToolbarProps {
  className?: string;
}

export function EditorToolbar({ className }: EditorToolbarProps) {
  return (
    <div className={className}>
      {/* TODO: implement EditorToolbar */}
      <span className="text-sm text-muted-foreground">EditorToolbar (stub)</span>
    </div>
  );
}

export default EditorToolbar;
