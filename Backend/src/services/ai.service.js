import { ChatMistralAI, MistralAIEmbeddings } from "@langchain/mistralai";
import { CohereEmbeddings } from "@langchain/cohere";

const embeddingModel = new CohereEmbeddings({
  model: "embed-english-v3.0",
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
      "topics": ["topic1", "topic2", "topic3"]
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

export async function generateVectorFromData({ summary, title, topics }) {
  const text = `${title}. ${summary}. Topics: ${topics.join(", ")}. Tags: ${tags.join(", ")}`;
  const vector = await embeddingModel.embedQuery(text);
  return vector;
}

export async function generateVectorFromQuery(query) {
  const queryVector = await embeddingModel.embedQuery(query);
  return queryVector;
}
