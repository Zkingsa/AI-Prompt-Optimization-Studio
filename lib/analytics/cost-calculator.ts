const COST_PER_1K_TOKENS: Record<string, number> = {
  "gpt-4o": 0.005,
  "claude-sonnet-4-6": 0.003,
  "gemini-1.5-pro": 0.0035,
};

export function getCostPer1kTokens(model: string): number {
  return COST_PER_1K_TOKENS[model] ?? 0.004;
}

export function estimateRunCost(tokensIn: number, tokensOut: number, model: string): number {
  return ((tokensIn + tokensOut) / 1000) * getCostPer1kTokens(model);
}

/**
 * Until per-run token usage is persisted, estimate spend from a run count
 * using a representative average token footprint per run (~600 tokens).
 */
export function estimateCostForRuns(runCount: number, model = "gpt-4o"): number {
  const avgTokensPerRun = 600;
  return estimateRunCost(avgTokensPerRun * 0.4, avgTokensPerRun * 0.6, model) * runCount;
}
