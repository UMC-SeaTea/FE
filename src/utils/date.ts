export function getDaysAgo(dateString?: string | null): number | null {
  if (!dateString) return null;

  const today = new Date();
  const past = new Date(dateString);

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const pastDate = new Date(
    past.getFullYear(),
    past.getMonth(),
    past.getDate()
  );

  const diffMs = todayDate.getTime() - pastDate.getTime();

  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}
