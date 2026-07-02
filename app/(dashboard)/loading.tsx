export default function DashboardLoading() {
  return (
    <div className="flex h-full items-center justify-center p-10">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
    </div>
  );
}