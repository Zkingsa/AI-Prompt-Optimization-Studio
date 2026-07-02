"use client";

interface TestRunnerProps {
  className?: string;
}

export function TestRunner({ className }: TestRunnerProps) {
  return (
    <div className={className}>
      {/* TODO: implement TestRunner */}
      <span className="text-sm text-muted-foreground">TestRunner (stub)</span>
    </div>
  );
}

export default TestRunner;
