"use client";

interface TemplatePreviewProps {
  className?: string;
}

export function TemplatePreview({ className }: TemplatePreviewProps) {
  return (
    <div className={className}>
      {/* TODO: implement TemplatePreview */}
      <span className="text-sm text-muted-foreground">TemplatePreview (stub)</span>
    </div>
  );
}

export default TemplatePreview;
