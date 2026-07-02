"use client";

interface DropdownProps {
  className?: string;
}

export function Dropdown({ className }: DropdownProps) {
  return (
    <div className={className}>
      {/* TODO: implement Dropdown */}
      <span className="text-sm text-muted-foreground">Dropdown (stub)</span>
    </div>
  );
}

export default Dropdown;
