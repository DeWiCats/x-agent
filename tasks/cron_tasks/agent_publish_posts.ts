import { getScraper } from "../utils/scraper.api";
import { supabase } from "../utils/supabase.api";

const agentPublishPosts = async () => {
  try {
    const currentUTCDate = new Date();
    const currentTime = currentUTCDate.toLocaleTimeString("en-US", {
      hour12: false,
      timeZone: "UTC",
    });

    // Create timestamps for comparison
    const today = new Date().toISOString().split("T")[0]; // Get current UTC date
    const agents = await supabase
      .from("agents")
      .select("*, posts!inner(*), accounts!inner(*)")
      .eq("posts.status", "scheduled")
      .or(
        `time_to_post.lte.${currentTime},and(time_to_post.gte.${currentTime},or(last_posted_date.neq.${today},last_posted_date.is.null))`
      );

    if (!agents.data || agents.data.length === 0) {
      console.log("No agents found");
      process.exit(0);
    }

    for (const agent of agents.data) {
      if (!agent.accounts?.username || !agent.accounts?.password) {
        console.log("No username or password found for agent");
        // TODO: Add a log to sentry or some other logger
        continue;
      }
      const scraper = await getScraper(agent);

      if (!agent.posts[0].media_base64) {
        console.log("No media found for post");
        // TODO: Add a log to sentry or some other logger
        continue;
      }

      const imageBuffer = Buffer.from(agent.posts[0].media_base64, "base64");

      if (!agent.posts[0].content) {
        console.log("No content found for post");
        // TODO: Add a log to sentry or some other logger
        continue;
      }

      // We should only have one post. If not something went wrong.
      const response = await scraper.sendTweet(
        agent.posts[0].content,
        undefined,
        [
          {
            data: imageBuffer,
            mediaType: "image/png",
          },
        ]
      );

      if (response) {
        await supabase
          .from("posts")
          .update({
            status: "published",
          })
          .eq("id", agent.posts[0].id);
        // update last posted date
        await supabase
          .from("agents")
          .update({
            last_posted_date: currentUTCDate.toDateString(),
          })
          .eq("id", agent.id);
        console.log("Tweet sent");
      } else {
        console.log("Tweet failed");
        // TODO: Add a log to sentry or some other logger
      }
    }
  } catch (error) {
    console.log(error);
    // TODO: Add a log to sentry or some other logger
  }
};

agentPublishPosts();
