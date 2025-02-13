import { SearchMode } from "@dewicats/agent-twitter-client";
import { getScraper } from "../utils/scraper.api";
import { supabase } from "../utils/supabase.api";
import {
  generateMemeWorthyTweet,
  scrapeContentOffOfTweet,
} from "../utils/twitter.api";
import { createImage } from "../utils/venice.api";
import { ImageStyle } from "@/lib/types";

const DRY_RUN = process.env.DRY_RUN === "true";

const agentSchedulePosts = async () => {
  console.log("agentSchedulePosts");

  try {
    // Get Agents that do not have a post scheduled for today and haven't posted today
    const startOfDay = new Date(new Date().setDate(30));
    startOfDay.setHours(0, 0, 0, 0);

    const agents = await supabase
      .from("agents")
      .select("*, posts!inner(*), accounts!inner(*)")
      .not("posts", "is", null)
      .not("posts.timestamp", "gte", new Date().getTime())
      .or(
        `last_posted_date.is.null,last_posted_date.lt.${startOfDay.toDateString()}`
      );

    if (!agents.data || agents.data.length === 0) {
      console.log("No agents found");
      process.exit(0);
    }

    for (const agent of agents.data) {
      if (!agent.accounts) {
        console.log("No accounts found for agent");
        continue;
      }

      if (!agent.accounts.username || !agent.accounts.password) {
        console.log("No username or password found for agent");
        // TODO: Add a log to sentry or some other logger
        continue;
      }

      const scraper = await getScraper(agent);

      // Get current trends
      const trends = await scraper.getTrends();
      // Get a random trend
      const randomTrend = trends[Math.floor(Math.random() * trends.length)];
      console.log("randomTrend: ", randomTrend);

      const top10Tweets = await scraper.fetchSearchTweets(
        randomTrend,
        10,
        SearchMode.Top
      );

      console.log("top10Tweets: ", top10Tweets);

      const scrapedTweets = await scrapeContentOffOfTweet(top10Tweets.tweets);

      const imageResponse = await createImage({
        trend: randomTrend,
        scrapedTweets,
        stylePreset: agent.image_style as ImageStyle,
      });

      const response = await generateMemeWorthyTweet({
        agent,
        randomTrend,
        scrapedTweets,
      });

      console.log("response: ", response);

      if (response) {
        // We need to schedule the post
        if (!DRY_RUN) {
          await supabase.from("posts").insert({
            agent: agent.id,
            content: response.content,
            media_base64: imageResponse.images[0],
            status: "scheduled",
            score: response.score,
          });
        }
        console.log("Tweet Scheduled 📝");
      } else {
        console.log("No content");
        // TODO: Add a log to sentry or some other logger
      }
    }
  } catch (error) {
    console.log(error);
    // TODO: Add a log to sentry or some other logger
  }
};

agentSchedulePosts();
