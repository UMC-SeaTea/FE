export function getDaysAgo(dateString?: string | null): number | null {
  if (!dateString) return null;

  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const today = new Date();
  const past = new Date(dateString);

  const utcToday = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const utcPast = Date.UTC(past.getFullYear(), past.getMonth(), past.getDate());

  return Math.floor((utcToday - utcPast) / MS_PER_DAY);
}
