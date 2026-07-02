"use client";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={className}>
      {/* TODO: implement Skeleton */}
      <span className="text-sm text-muted-foreground">Skeleton (stub)</span>
    </div>
  );
}

export default Skeleton;
