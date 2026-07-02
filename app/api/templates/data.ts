export interface TemplateRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
}

/**
 * Static seed templates. Move this into the database (a Template model)
 * once templates need to be user-editable or shareable across workspaces.
 */
export const TEMPLATES: TemplateRecord[] = [
  {
    id: "support-triage",
    title: "Support ticket triage",
    category: "Customer support",
    description: "Classifies an incoming support ticket and explains the reasoning.",
    content:
      "You are a support triage assistant.\n\nTicket: {{ticket}}\n\nClassify the ticket as billing, bug, or question, and explain why in one sentence.",
  },
  {
    id: "meeting-summary",
    title: "Meeting summary",
    category: "Productivity",
    description: "Turns a raw transcript into a structured summary with action items.",
    content:
      "Summarize the following meeting transcript into:\n1. Key decisions\n2. Action items (with owner)\n3. Open questions\n\nTranscript:\n{{transcript}}",
  },
  {
    id: "code-review",
    title: "Code review comment",
    category: "Engineering",
    description: "Reviews a diff and produces actionable, specific feedback.",
    content:
      "Review the following diff for correctness, readability, and edge cases. Be specific and reference line numbers where possible.\n\nDiff:\n{{diff}}",
  },
  {
    id: "sql-explainer",
    title: "SQL query explainer",
    category: "Engineering",
    description: "Explains what a SQL query does in plain language.",
    content: "Explain what this SQL query does, step by step, in plain language:\n\n{{query}}",
  },
  {
    id: "product-faq",
    title: "Product FAQ answer",
    category: "Customer support",
    description: "Answers a customer question using only the provided docs context.",
    content:
      "Using only the context below, answer the customer's question. If the answer isn't in the context, say you don't know.\n\nContext:\n{{context}}\n\nQuestion:\n{{question}}",
  },
];