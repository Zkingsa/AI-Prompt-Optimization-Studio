export interface PromptVariable {
  name: string;
  defaultValue?: string;
  description?: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  description?: string;
  model: string;
  variables: PromptVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface PromptVersionRecord {
  id: string;
  promptId: string;
  content: string;
  note?: string;
  createdAt: string;
}

export interface PromptExecutionResult {
  output: string;
  model: string;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
}
