"use client";

interface CodeEditorProps {
  className?: string;
}

export function CodeEditor({ className }: CodeEditorProps) {
  return (
    <div className={className}>
      {/* TODO: implement CodeEditor */}
      <span className="text-sm text-muted-foreground">CodeEditor (stub)</span>
    </div>
  );
}

export default CodeEditor;
