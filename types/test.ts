export interface TestCase {
  id: string;
  input: Record<string, string>;
  expected?: string;
}

export interface TestSuite {
  id: string;
  name: string;
  promptId: string;
  testCases: TestCase[];
  createdAt: string;
  updatedAt: string;
}

export interface TestCaseResult {
  testCaseId: string;
  output: string;
  passed: boolean | null;
  score?: number;
  latencyMs: number;
}

export interface TestRunResult {
  id: string;
  testSuiteId: string;
  results: TestCaseResult[];
  createdAt: string;
}
