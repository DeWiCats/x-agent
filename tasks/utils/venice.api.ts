import OpenAI from "openai";
import { config } from "./config";

const BASE_URL = "https://api.venice.ai/api/v1";

export const openai = new OpenAI({
  apiKey: config.veniceToken,
  baseURL: BASE_URL,
});

export const generateVeniceText = async ({
  model = "llama-3.3-70b",
  prompt,
  characterSlug,
  maxTokens,
  temperature,
}: {
  model?: "deepseek-r1-llama-70b" | "llama-3.3-70b" | "deepseek-r1-671b";
  prompt: string;
  characterSlug?: string | null;
  maxTokens?: number;
  temperature?: number;
}) => {
  const veniceParameters = {
    include_venice_system_prompt: false,
  } as Record<string, string | boolean>;

  console.log("characterSlug: ", characterSlug);
  if (characterSlug) {
    // veniceParameters["character_slug"] = characterSlug;
  }

  const completionStream = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
    // @ts-expect-error Venice.ai paramters are unique to Venice.
    venice_parameters: veniceParameters,
    max_completion_tokens: maxTokens,
    temperature: temperature,
  });

  // Weird bug where the response is a string and not a JSON object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actualResponse = JSON.parse(completionStream as any);

  return actualResponse.choices[0].message.content;
};

export const createImage = async (trend: string, scrapedTweets: string[]) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.veniceToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "fluently-xl",
      prompt: `Create a viral, attention-grabbing meme image inspired by the trend "${trend}". Use these tweets for context and inspiration: ${scrapedTweets
        .slice(0, 3)
        .join(
          " "
        )}. The image should be highly shareable, visually striking, and resonate with Twitter culture. Focus on humor, relevance, and maximum engagement potential. Make it memorable and meme-worthy while maintaining a professional quality.`,
      height: 1080,
      width: 1080,
      safe_mode: true,
      hide_watermark: true,
      style_preset: "Anime",
    }),
  };

  const response = await fetch(`${BASE_URL}/image/generate`, options);
  const data = await response.json();

  return data as {
    request: {
      width: number;
      height: number;
      steps: number;
      hide_watermark: boolean;
      return_binary: boolean;
      model: string;
      prompt: string;
      safe_mode: boolean;
      style_preset: string;
    };
    images: string[];
  };
};
