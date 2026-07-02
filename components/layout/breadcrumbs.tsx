"use client";

interface BreadcrumbsProps {
  className?: string;
}

export function Breadcrumbs({ className }: BreadcrumbsProps) {
  return (
    <div className={className}>
      {/* TODO: implement Breadcrumbs */}
      <span className="text-sm text-muted-foreground">Breadcrumbs (stub)</span>
    </div>
  );
}

export default Breadcrumbs;
