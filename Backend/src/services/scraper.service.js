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

    const thumbnailRaw = getMetatag("image");

    return {
      url,
      title: $("title").text() || "",
      thumbnail: toAbsoluteUrl(url, thumbnailRaw),
      content: getMetatag("description"),
      author: getMetatag("author"),
      keywords: getMetatag("keywords"),
    };
  } catch (err) {
    return {
      url,
      title: "",
      thumbnail: "",
      content: "",
      author: "",
      keywords: "",
    };
  }
};
