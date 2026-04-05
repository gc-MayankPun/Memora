import * as cheerio from "cheerio";
import nodeFetch from "node-fetch";

export const scrapeMetatags = async (url) => {
  try {
    const response = await nodeFetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "text/html,application/xhtml+xml",
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

    const faviconRaw =
      $("link[rel='icon']").attr("href") ||
      $("link[rel='shortcut icon']").attr("href") ||
      $("link[rel='apple-touch-icon']").attr("href") ||
      "";

    const thumbnailRaw =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[property="og:image:url"]').attr("content") ||
      $('meta[property="og:image:secure_url"]').attr("content") ||
      "";

    const favicon = faviconRaw ? toAbsoluteUrl(url, faviconRaw) : "";
    const thumbnail = thumbnailRaw ? toAbsoluteUrl(url, thumbnailRaw) : "";

    return {
      thumbnail,
      favicon,
      content: getMetatag("description"),
      keywords: getMetatag("keywords"),
    };
  } catch (err) {
    return {
      thumbnail: "",
      favicon: "",
      content: "",
      keywords: "",
    };
  }
};
