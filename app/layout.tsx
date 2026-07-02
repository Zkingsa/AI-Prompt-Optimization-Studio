import type { Metadata } from "next";
import "./global.css";
import { Providers } from "./providers";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Prompt Optimization Studio",
    template: "%s · Prompt Optimization Studio",
  },
  description:
    "Build, test, and optimize prompts across OpenAI, Anthropic, and Google AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}