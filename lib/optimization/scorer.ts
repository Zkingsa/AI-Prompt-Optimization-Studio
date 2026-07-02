export function scoreOutput(output: string, expected?: string | null): { passed: boolean | null; score?: number } {
  if (!expected) return { passed: null };

  const normalize = (s: string) => s.trim().toLowerCase();
  const a = normalize(output);
  const b = normalize(expected);

  if (a === b) return { passed: true, score: 1 };
  if (a.includes(b) || b.includes(a)) return { passed: true, score: 0.7 };
  return { passed: false, score: 0 };
}
