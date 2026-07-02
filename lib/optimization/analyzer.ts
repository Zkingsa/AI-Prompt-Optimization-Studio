export interface PromptAnalysis {
  wordCount: number;
  variableCount: number;
  hasExamples: boolean;
  hasOutputFormat: boolean;
  readabilityHint: "concise" | "moderate" | "verbose";
}

export function analyzePrompt(content: string): PromptAnalysis {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const variableCount = new Set(Array.from(content.matchAll(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g), (m) => m[1])).size;
  const hasExamples = /example|e\.g\.|for instance/i.test(content);
  const hasOutputFormat = /format|json|respond with|output:/i.test(content);

  const readabilityHint = wordCount < 60 ? "concise" : wordCount < 200 ? "moderate" : "verbose";

  return { wordCount, variableCount, hasExamples, hasOutputFormat, readabilityHint };
}
