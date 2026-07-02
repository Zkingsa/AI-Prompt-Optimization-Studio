import type { PromptExecutionResult } from "@/types/prompt";

export interface ExecuteOptions {
  model: string;
  content: string;
  variables?: Record<string, string>;
}

function interpolate(content: string, variables: Record<string, string> = {}) {
  return content.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_, name) => variables[name] ?? `{{${name}}}`);
}

function estimateTokens(text: string) {
  return Math.max(1, Math.ceil(text.length / 4));
}

const COST_PER_1K_TOKENS: Record<string, number> = {
  "gpt-4o": 0.005,
  "claude-sonnet-4-6": 0.003,
  "gemini-1.5-pro": 0.0035,
};

/**
 * Executes a prompt against the configured model.
 *
 * No provider API keys are required for the scaffold to run end to end —
 * this returns a deterministic mock completion so the UI is fully testable.
 * Swap the body of this function for real calls into lib/ai/openai.ts,
 * lib/ai/anthropic.ts, or lib/ai/google-ai.ts (routed via model-router.ts)
 * once provider keys are configured.
 */
export async function runPrompt({ model, content, variables }: ExecuteOptions): Promise<PromptExecutionResult> {
  const resolved = interpolate(content, variables);
  const start = Date.now();

  // TODO: route to a real provider client based on `model` via model-router.ts
  const output = `[mock ${model} response]\n\n${resolved.slice(0, 600)}`;

  const tokensIn = estimateTokens(resolved);
  const tokensOut = estimateTokens(output);
  const costPer1k = COST_PER_1K_TOKENS[model] ?? 0.004;

  return {
    output,
    model,
    latencyMs: Date.now() - start + 120,
    tokensIn,
    tokensOut,
    costUsd: ((tokensIn + tokensOut) / 1000) * costPer1k,
  };
}
