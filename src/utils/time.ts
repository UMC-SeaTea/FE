const MS_PER_MINUTE = 60000;
const MINUTES_PER_HOUR = 60;
const HOURS_PER_DAY = 24;

export const formatTimeText = (createdAt: number) => {
  const diffMs = Date.now() - createdAt;
  const diffMin = Math.floor(diffMs / MS_PER_MINUTE);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHrs = Math.floor(diffMin / MINUTES_PER_HOUR);
  if (diffHrs < HOURS_PER_DAY) return `${diffHrs}시간 전`;

  const d = new Date(createdAt);
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}.${dd}`;
};
