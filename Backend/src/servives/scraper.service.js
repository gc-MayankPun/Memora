import axios from "axios";
import * as cheerio from "cheerio";

export async function scrapeContent(url) {
  try {
    const { data } = await axios.get(url, {
      timeout: 8000,
      headers: {
        // pretend to be a real browser — some sites block bots
        "User-Agent": "Mozilla/5.0 (compatible; Memora/1.0)",
      },
    });

    const $ = cheerio.load(data);

    // get thumbnail from og:image meta tag
    const thumbnail =
      $('meta[property="og:image"]').attr("content") || "";

    // get readable text — remove scripts, styles, navs
    $("script, style, nav, footer, header").remove();
    const content = $("body").text().replace(/\s+/g, " ").trim();

    return { thumbnail, content };

  } catch (err) {
    // if scraping fails, don't crash the whole save
    // just return empty strings
    return { thumbnail: "", content: "" };
  }
}