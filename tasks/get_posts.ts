import { Scraper } from "agent-twitter-client";
import { supabase } from "./utils/supabase.api";
import { Cookie } from "tough-cookie";

const getPosts = async () => {
  const scraper = new Scraper();

  const agent = await supabase.from("agents").select("*").eq("id", 1).single();

  // If the agent has cookies, set them
  if (agent.data?.cookies) {
    const cookieObjs = JSON.parse(agent.data.cookies) as JSON[];
    const cookies = cookieObjs
      .map((cookie) => Cookie.fromJSON(cookie)?.toString())
      .filter((cookie) => cookie !== undefined);
    await scraper.setCookies(cookies);
  }

  const isLoggedIn = await scraper.isLoggedIn();

  if (!agent.data?.username || !agent.data?.password) {
    throw new Error("Agent username or password not found");
  }

  // If the agent is not logged in, login and update the cookies
  if (!isLoggedIn) {
    await scraper.login(agent.data.username, agent.data.password);
    const cookies = await scraper.getCookies();
    console.log("cookies: ", cookies);
    const jsonCookies = JSON.stringify(cookies);

    // Update cookies in the database
    await supabase
      .from("agents")
      .update({ cookies: jsonCookies })
      .eq("id", agent.data.id);
  } else {
    console.log("Agent is already logged in");
  }

  const posts = await scraper.getTweets(agent.data.username, 20);

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
    if (!existingPost.data) {
      console.log("inserting post: ", post);
      await supabase.from("posts").insert({
        id: Number(post.id),
        content: post.text,
        agent: agent.data.id,
        timestamp: post.timestamp,
        x_url: post.permanentUrl,
        media_url: firstPhoto || null,
        status: "published",
      });
    } else {
      console.log("Skipping. Post already exists: ", post.id);
    }

    tweets = await posts.next();
  }
};

getPosts();
