import * as cheerio from "cheerio";
import nodeFetch from "node-fetch";

export const scrapeMetatags = async (url) => {
  try {
    // YouTube-specific handling - construct thumbnail directly from video ID
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = null;

      // Extract video ID from different YouTube URL formats
      if (url.includes("youtube.com/watch")) {
        const match = url.match(/[?&]v=([^&]+)/);
        videoId = match ? match[1] : null;
      } else if (url.includes("youtu.be")) {
        const match = url.match(/youtu\.be\/([^?&]+)/);
        videoId = match ? match[1] : null;
      }

      if (videoId) {
        // Fetch the page to get description
        const response = await nodeFetch(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            Accept: "text/html,application/xhtml+xml",
          },
        });

        const html = await response.text();
        const $ = cheerio.load(html);

        const content =
          $('meta[name="description"]').attr("content") ||
          $('meta[property="og:description"]').attr("content") ||
          "";

        // Try OG tags first for YouTube thumbnail (like any other website)
        let thumbnail =
          $('meta[property="og:image"]').attr("content") ||
          $('meta[property="og:image:secure_url"]').attr("content") ||
          $('meta[property="og:image:url"]').attr("content") ||
          $('meta[name="twitter:image"]').attr("content") ||
          $('link[rel="image_src"]').attr("href") ||
          "";

        // Fallback: construct direct YouTube thumbnail URL if OG tags don't work
        if (!thumbnail) {
          thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
        }
        const favicon = "https://www.youtube.com/favicon.ico";

        return {
          content,
          thumbnail,
          favicon,
          keywords: "YouTube, video",
        };
      }
    }

    // General website scraping
    const response = await nodeFetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const getMetatag = (name) =>
      $(`meta[name="${name}"]`).attr("content") ||
      $(`meta[property="og:${name}"]`).attr("content") ||
      $(`meta[name="twitter:${name}"]`).attr("content") ||
      "";

    const toAbsoluteUrl = (base, relative) => {
      try {
        return new URL(relative, base).href;
      } catch {
        return relative || "";
      }
    };

    // Enhanced thumbnail extraction - try multiple sources
    let thumbnail = "";
    const thumbnailSources = [
      $('meta[property="og:image"]').attr("content"),
      $('meta[property="og:image:secure_url"]').attr("content"),
      $('meta[property="og:image:url"]').attr("content"),
      $('meta[name="twitter:image"]').attr("content"),
      $('link[rel="image_src"]').attr("href"),
      // Try to find any large image in the page
      $("img").first().attr("src"),
    ];

    for (const source of thumbnailSources) {
      if (source && source.trim()) {
        thumbnail = toAbsoluteUrl(url, source.trim());
        break;
      }
    }

    const faviconRaw =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      $("link[rel='apple-touch-icon']").attr("href") ||
      "";

    const favicon = faviconRaw ? toAbsoluteUrl(url, faviconRaw) : "";

    return {
      content: getMetatag("description"),
      thumbnail,
      favicon,
      keywords: getMetatag("keywords"),
    };
  } catch (err) {
    return {
      content: "",
      thumbnail: "",
      favicon: "",
      keywords: "",
    };
  }
};
