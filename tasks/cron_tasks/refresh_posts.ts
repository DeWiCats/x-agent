import { supabase } from "../utils/supabase.api";
import { getScraper } from "../utils/scraper.api";
import { getTweetScore } from "../utils/twitter.api";

const getPosts = async () => {
  const agents = await supabase.from("agents").select("*");

  if (!agents.data) {
    console.log("No agents found");
    return;
  }

  for (const agent of agents.data) {
    const scraper = await getScraper(agent);

    if (!agent.username || !agent.password) {
      console.log("No username or password found for agent");
      continue;
    }

    const posts = await scraper.getTweets(agent.username, 20);

    let tweets = await posts.next();
    while (!tweets.done) {
      const post = tweets.value;
      const firstPhoto = post?.photos[0];
      // only insert if the post is not already in the database
      // TODO: inefficient, but it works for now
      const existingPost = await supabase
        .from("posts")
        .select("*")
        .eq("id", Number(post.id))
        .single();
      if (!existingPost.data && post.text) {
        const twitterScore = await getTweetScore(post.text);
        console.log("inserting post: ", post);

        await supabase.from("posts").insert({
          id: Number(post.id),
          content: post.text,
          agent: agent.id,
          timestamp: post.timestamp,
          x_url: post.permanentUrl,
          media_url: firstPhoto?.url || null,
          status: "published",
          score: twitterScore,
        });
      } else {
        console.log("Skipping. Post already exists: ", post.id);
      }

      tweets = await posts.next();
    }
  }
};

getPosts();
