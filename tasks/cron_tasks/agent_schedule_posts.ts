import { SearchMode } from "@dewicats/agent-twitter-client";
import { getScraper } from "../../src/utils/scraper.api";
import { supabase } from "../../src/utils/supabase.api";
import {
  generateMemeWorthyTweet,
  scrapeContentOffOfTweet,
} from "../../src/utils/twitter.api";
import { createImage } from "../../src/utils/venice.api";
import { ImageStyle } from "@/lib/types";

const DRY_RUN = process.env.DRY_RUN === "true";

const agentSchedulePosts = async () => {
  console.log("agentSchedulePosts");

  try {
    const agents = await supabase
      .from("agents")
      .select("*, posts(*), accounts!inner(*)")
      .not(
        "posts.timestamp",
        "gte",
        Math.floor(Date.now() / 1000) - 24 * 60 * 60
      )
      .eq("posts.status", "scheduled");

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

      console.log("Agent with account found");

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

      console.log("Got top10Tweets");

      const scrapedTweets = await scrapeContentOffOfTweet(top10Tweets.tweets);

      console.log("Got scrapedTweets");

      const imageResponse = await createImage({
        trend: randomTrend,
        scrapedTweets,
        stylePreset: agent.image_style as ImageStyle,
      });

      console.log("Got imageResponse");

      const imageBuffer = Buffer.from(imageResponse.images[0], "base64");

      console.log("Got imageBuffer");

      const uploadPath = `posts/${
        agent.id
      }/${randomTrend}+${new Date().getTime()}.png`;

      const imageFile = new File([imageBuffer], "post.png", {
        type: "image/png",
      });

      console.log("Got imageFile");

      const { error } = await supabase.storage
        .from("images")
        .upload(uploadPath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log("Error uploading image: ", error);
        // TODO: Add a log to sentry or some other logger
        continue;
      }

      console.log("Got publicUrl");

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(uploadPath);

      const response = await generateMemeWorthyTweet({
        agent,
        tweetContext: randomTrend,
        scrapedTweets,
      });

      console.log("Got MemeWorthy Tweet");

      if (response) {
        // We need to schedule the post
        if (!DRY_RUN) {
          await supabase.from("posts").insert({
            agent: agent.id,
            content: response.content,
            media_url: publicUrl,
            status: "scheduled",
            score: response.score,
            timestamp: Math.floor(Date.now() / 1000),
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
