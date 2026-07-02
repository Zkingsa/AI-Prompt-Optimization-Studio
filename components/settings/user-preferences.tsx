"use client";

interface UserPreferencesProps {
  className?: string;
}

export function UserPreferences({ className }: UserPreferencesProps) {
  return (
    <div className={className}>
      {/* TODO: implement UserPreferences */}
      <span className="text-sm text-muted-foreground">UserPreferences (stub)</span>
    </div>
  );
}

export default UserPreferences;
