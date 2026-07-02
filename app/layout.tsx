import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

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
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}