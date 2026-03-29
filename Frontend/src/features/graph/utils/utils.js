export const NOW = Date.now();

export function getResurfaced(saves) {
  return saves
    .filter((s) => {
      const daysSinceCreated =
        (NOW - new Date(s.createdAt)) / (1000 * 60 * 60 * 24);

      const daysSinceViewed = s.lastViewedAt
        ? (NOW - new Date(s.lastViewedAt)) / (1000 * 60 * 60 * 24)
        : Infinity;

      // return daysSinceCreated >= 0 && daysSinceViewed >= 0; // For Testing
        return daysSinceCreated >= 7 && daysSinceViewed >= 5;
    })
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}

export function timeAgo(dateStr) {
  const diff = NOW - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 1) return "today";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export function getResurfaceLabel(dateStr) {
  const diff = NOW - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days < 7) return "👀 You literally just saved this...";
  if (days < 30) return `Saved ${days} days ago — still on your to-read list?`;
  if (days < 60) return "Saved a month ago — bet you forgot this existed 💀";
  if (days < 365)
    return `${Math.floor(days / 30)} months ago — this is collecting dust bro`;
  return "Over a year ago 💀 this thing is ancient, rediscover it";
}
