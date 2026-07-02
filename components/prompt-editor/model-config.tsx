"use client";

interface ModelConfigProps {
  className?: string;
}

export function ModelConfig({ className }: ModelConfigProps) {
  return (
    <div className={className}>
      {/* TODO: implement ModelConfig */}
      <span className="text-sm text-muted-foreground">ModelConfig (stub)</span>
    </div>
  );
}

export default ModelConfig;
