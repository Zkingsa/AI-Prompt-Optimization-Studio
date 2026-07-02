"use client";

interface TestSuiteBuilderProps {
  className?: string;
}

export function TestSuiteBuilder({ className }: TestSuiteBuilderProps) {
  return (
    <div className={className}>
      {/* TODO: implement TestSuiteBuilder */}
      <span className="text-sm text-muted-foreground">TestSuiteBuilder (stub)</span>
    </div>
  );
}

export default TestSuiteBuilder;
