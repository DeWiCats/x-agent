import { AxiosError } from "axios";
import { generateVeniceText } from "./venice.api";
import { Tweet } from "@dewicats/agent-twitter-client";
import { Database } from "@/types/database.types";

export const generateMemeWorthyTweet = async ({
  agent,
  tweetContext,
  scrapedTweets,
}: {
  agent: Database["public"]["Tables"]["agents"]["Row"];
  tweetContext: string;
  scrapedTweets?: string[];
}) => {
  // TODO: FOR Agnel what do we do with Agent parameters
  let bestResponse = "";
  let bestScore = 0;
  let attempts = 0;
  const prompt = `You are a social media expert crafting viral tweets. Create an engaging tweet about: ${tweetContext}

  ${
    agent.context
      ? `Personality Context (only use if it exists): "${agent.context}"`
      : ""
  }
  ${
    agent.fact_check_threshold
      ? `Fact check threshold: ${agent.fact_check_threshold}%`
      : ""
  }
  ${agent.tone ? `Tone - Casual (100%) to Formal (0%): ${agent.tone}%` : ""}
  ${
    agent.style
      ? `Style - Shitposting (100%) to Analytical (0%): ${agent.style}%`
      : ""
  }
  ${
    agent.stance
      ? `Stance - Controversial (100%) to Neutral (0%): ${agent.stance}%`
      : ""
  }

${
  scrapedTweets
    ? `Here are some recent popular tweets about this trend for context:
${scrapedTweets.slice(0, 3).join("\n")}`
    : ""
}

Requirements:
- Maximum 280 characters
${agent.engagement_hooks ? `${agent.engagement_hooks}` : ""}

Style Guidelines:
${agent.engagement_rules ? `${agent.engagement_rules}` : ""}

Ethical Boundaries:
${agent.ethical_boundaries ? `${agent.ethical_boundaries}` : ""}

Output the tweet text only, no explanations.`;

  while (attempts < 3) {
    const veniceResponse = await generateVeniceText({
      model: "llama-3.3-70b",
      prompt,
    });

    if (!veniceResponse) {
      console.log("Error generating content");
      // TODO: Add a log to sentry or some other logger
      continue;
    }

    // Now get this response and pass it into deepseek-r1-671b
    // const deepseekResponse = await generateVeniceText({
    //   model: "deepseek-r1-671b",
    //   prompt: veniceResponse,
    //   characterSlug,
    // });

    // if (!deepseekResponse) {
    //   console.log("Error generating content");
    //   // TODO: Add a log to sentry or some other logger
    //   continue;
    // }

    // const actualResponse = deepseekResponse.split("</think>\n\n")[1];

    // Score the content using the Twitter algorithm criteria
    const score = await getTweetScore(veniceResponse);

    if (score > bestScore) {
      bestScore = score;
      bestResponse = veniceResponse;
    }

    if (score >= 75) {
      break;
    }

    attempts++;
  }

  if (!bestResponse) {
    return null;
  }

  return {
    content: bestResponse,
    score: bestScore,
  };
};

export const getTweetScore = async (tweet: string): Promise<number> => {
  try {
    const response = await generateVeniceText({
      model: "llama-3.3-70b",
      prompt: `Rate this tweet on a scale of 0-100 based on the following comprehensive criteria:

Engagement Potential (40 points max):
- Likelihood to generate likes (30x visibility boost)
- Potential for retweets (20x visibility boost)
- Probability of meaningful replies
- Potential for long view times (>2 minutes)
- Likelihood to drive profile visits

Content Quality (30 points max):
- Must NOT promote/mention tokens or tickers (automatic 0 if violated)
- Authenticity (no promotional/shilly content)
- Fits crypto twitter culture and audience expectations
- Appropriate use of media (images/videos)
- Relevance to user's typical content category

Risk Factors (30 points max):
- Low risk of being reported/blocked/muted
- No potential disinformation flags
- Professional language use
- Quality of potential engaging accounts
- Safe from algorithmic penalties

Scoring Guidelines:
0: Contains unauthorized tokens/tickers
1-40: Promotional/shilly or high-risk content
41-70: Engaging but basic content
71-100: Potential viral tweet with high engagement metrics

ONLY RETURN A NUMBER 0-100, NOTHING ELSE.

Tweet to rate: "${tweet}"`,
      maxTokens: 10,
      temperature: 0.3,
    });

    const score = parseInt(response);
    if (isNaN(score) || score < 0 || score > 100) {
      console.log("Poor score generated: ", score);
      // TODO: Add a log to sentry or some other logger
    }

    return score;
  } catch (e) {
    const { response } = e as AxiosError;
    switch (response?.status) {
      case 400:
        throw Error(`Context window is full.`);
      case 404:
        throw Error(`Model is unavailable.`);
      case 429:
        throw Error(`Rate limited.`);
      default:
        throw e;
    }
  }
};

export const scrapeContentOffOfTweet = async (
  tweets: Tweet[]
): Promise<string[]> => {
  const tweetsArray: string[] = [];

  for (const tweet of tweets) {
    if (tweet.text) {
      tweetsArray.push(tweet.text);
    }
  }

  return tweetsArray;
};
