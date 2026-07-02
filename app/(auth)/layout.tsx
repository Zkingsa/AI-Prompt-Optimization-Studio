import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 block text-center text-sm font-semibold tracking-tight">
          Prompt Optimization Studio
        </Link>
        <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
