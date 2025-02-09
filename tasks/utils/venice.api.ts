import OpenAI from "openai";
import { config } from "./config";

const BASE_URL = "https://api.venice.ai/api/v1";

export const openai = new OpenAI({
  apiKey: config.veniceToken,
  baseURL: BASE_URL,
});

export const createImage = async (trend: string) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.veniceToken}`,
      "Content-Type": "application/json",
    },
    body: `{"model":"fluently-xl","prompt": "Make a Viral Meme about the ${trend}","height":1080,"width":1080,"safe_mode":true,"hide_watermark":true,"style_preset":"Anime"}`,
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
