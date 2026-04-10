import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import { CohereEmbeddings } from "@langchain/cohere";

const queryEmbeddingModel = new CohereEmbeddings({
  model: "embed-multilingual-v3.0",
  apiKey: process.env.COHERE_API_KEY,
  inputType: "search_query",
});

const documentEmbeddingModel = new CohereEmbeddings({
  model: "embed-multilingual-v3.0",
  apiKey: process.env.COHERE_API_KEY,
  inputType: "search_document",
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateSummaryAndTopics({
  title,
  content,
  keywords,
  url,
}) {
  const response = await mistralModel.invoke(
    `You are an assistant for a knowledge management app.

    Given the following webpage data:

    Title: "${title}"
    URL: "${url}"
    Keywords: "${keywords}"
    Content: "${content}"

    Your task:
    1. Generate a concise summary (max 2 sentences). 
    2. Extract 3-5 relevant topics that capture:
    - The DOMAIN (e.g., "government policy", "india politics", "fuel prices")
    - The SUBJECT (e.g., "react hooks", "docker deployment")
    - The INTENT (e.g., "tutorial", "news", "analysis")
    Keep topics as 1-3 descriptive words.
    3. Optionally, suggest AI-generated tags to enhance user-provided tags.

    Guidelines:
    - Use the title and keywords to improve accuracy.
    - Do NOT invent information not present in the content.
    - If content is very short or insufficient, rely on title and keywords.
    - Keep topics short (1-3 words each).

    Return ONLY valid JSON:

    {
      "summary": "your summary here",
      "topics": ["topic1", "topic2", "topic3"],
      "aiTags": ["tag1", "tag2"] // Optional AI-generated tags to enhance user-provided tags
    }
`,
  );

  try {
    const text = response.content;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      summary: parsed.summary || "",
      topics: parsed.topics || [],
      aiTags: parsed.aiTags || [],
    };
  } catch {
    return { summary: "", topics: [], aiTags: [] };
  }
}

export async function extractSearchKeywords(query) {
  const response = await mistralModel.invoke(
    `Extract the most important search keywords from this query. 
    Remove stop words, filler words, and keep only meaningful terms.
    Return ONLY a JSON array of strings, nothing else.
    
    Query: "${query}"
    
    Example: "how to make my react app faster" → ["react", "performance", "optimization"]
    Example: "best ways to learn docker" → ["docker", "learning"]`,
  );

  try {
    const text = response.content;
    const cleaned = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
  }
}

export async function generateVectorFromQuery(query) {
  const queryVector = await queryEmbeddingModel.embedQuery(query);
  return queryVector;
}

export async function generateVectorFromData({
  summary,
  title,
  topics,
  tags = [],
}) {
  const text =
    `Title: ${title}\nSummary: ${summary}\nTopics: ${topics.join(", ")}\nTags: ${tags.join(", ")}`.trim();
  const vector = await documentEmbeddingModel.embedQuery(text);
  return vector;
}
