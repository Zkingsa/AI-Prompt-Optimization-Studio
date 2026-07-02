"use client";

interface CardProps {
  className?: string;
}

export function Card({ className }: CardProps) {
  return (
    <div className={className}>
      {/* TODO: implement Card */}
      <span className="text-sm text-muted-foreground">Card (stub)</span>
    </div>
  );
}

export default Card;
