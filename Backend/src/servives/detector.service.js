export function detectType(url) {
  if (url.includes("twitter.com") || url.includes("x.com")) return "tweet";
  if (url.includes("youtube.com/watch") || url.includes("youtu.be")) return "youtube";
  if (url.includes("github.com")) return "github";
  if (url.includes("reddit.com")) return "reddit";
  if (url.endsWith(".pdf")) return "pdf";
  return "article";
}