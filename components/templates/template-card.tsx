"use client";

interface TemplateCardProps {
  className?: string;
}

export function TemplateCard({ className }: TemplateCardProps) {
  return (
    <div className={className}>
      {/* TODO: implement TemplateCard */}
      <span className="text-sm text-muted-foreground">TemplateCard (stub)</span>
    </div>
  );
}

export default TemplateCard;
