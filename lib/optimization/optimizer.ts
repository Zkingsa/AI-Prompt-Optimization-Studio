import type { PromptAnalysis } from "./analyzer";

export interface Suggestion {
  id: string;
  title: string;
  detail: string;
  severity: "info" | "warning";
}

export function generateSuggestions(content: string, analysis: PromptAnalysis): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (!analysis.hasOutputFormat) {
    suggestions.push({
      id: "output-format",
      title: "Specify an output format",
      detail: "State the exact shape you expect back (e.g. JSON with named fields) to reduce parsing errors.",
      severity: "warning",
    });
  }

  if (!analysis.hasExamples && analysis.wordCount > 40) {
    suggestions.push({
      id: "add-example",
      title: "Add a worked example",
      detail: "A single input/output example often improves consistency more than extra instructions.",
      severity: "info",
    });
  }

  if (analysis.readabilityHint === "verbose") {
    suggestions.push({
      id: "trim-length",
      title: "Trim the prompt",
      detail: "This prompt is long. Consider moving static context into a system message or a template.",
      severity: "info",
    });
  }

  if (analysis.variableCount === 0) {
    suggestions.push({
      id: "no-variables",
      title: "No variables detected",
      detail: "If this prompt will be reused with different inputs, parameterize it with {{variable}} placeholders.",
      severity: "info",
    });
  }

  if (suggestions.length === 0) {
    suggestions.push({
      id: "looks-good",
      title: "No issues found",
      detail: "This prompt covers format, examples, and variables. Consider running it against a test suite next.",
      severity: "info",
    });
  }

  return suggestions;
}
