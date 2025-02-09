import { Scraper } from "agent-twitter-client";
import { supabase } from "./utils/supabase.api";
import { openai, createImage } from "./utils/venice.api";
import { Cookie } from "tough-cookie";

const agentPost = async () => {
  try {
    const agents = await supabase.from("agents").select("*");
    if (!agents.data) {
      console.log("No agents found");
      return;
    }
    for (const agent of agents.data) {
      if (!agent.username || !agent.password) {
        console.log("No username or password found for agent");
        // TODO: Add a log to sentry or some other logger
        continue;
      }
      const scraper = new Scraper();

      // If the agent has cookies, set them
      if (agent.cookies) {
        const cookieObjs = JSON.parse(agent.cookies) as JSON[];
        const cookies = cookieObjs
          .map((cookie) => Cookie.fromJSON(cookie)?.toString())
          .filter((cookie) => cookie !== undefined);
        await scraper.setCookies(cookies);
      }

      const isLoggedIn = await scraper.isLoggedIn();

      // If the agent is not logged in, login and update the cookies
      if (!isLoggedIn) {
        await scraper.login(agent.username, agent.password);
        const cookies = await scraper.getCookies();
        console.log("cookies: ", cookies);
        const jsonCookies = JSON.stringify(cookies);

        // Update cookies in the database
        await supabase
          .from("agents")
          .update({ cookies: jsonCookies })
          .eq("id", agent.id);
      } else {
        console.log("Agent is already logged in");
      }

      // Get current trends
      const trends = await scraper.getTrends();

      // Get a random trend
      const randomTrend = trends[Math.floor(Math.random() * trends.length)];
      console.log("randomTrend: ", randomTrend);

      const image = await createImage(randomTrend);
      // Convert base64 string to Buffer and write to file
      const imageBuffer = Buffer.from(image.images[0], "base64");

      const completionStream = await openai.chat.completions.create({
        model: "llama-3.3-70b",
        messages: [
          {
            role: "user",
            content:
              "Create a meme about the following topic: " +
              randomTrend +
              ". Also make sure to make the content a max of 280 characters.",
          },
        ],
        // @ts-expect-error Venice.ai paramters are unique to Venice.
        venice_parameters: {
          //   include_venice_system_prompt: false,
          character_slug: agent.character_slug,
          include_venice_system_prompt: false,
        },
        max_completion_tokens: 100,
      });

      // Weird bug where the response is a string and not a JSON object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const actualStream = JSON.parse(completionStream as any);

      if (actualStream.choices[0].message.content) {
        await scraper.sendTweet(
          actualStream.choices[0].message.content,
          undefined,
          [
            {
              data: imageBuffer,
              mediaType: "image/png",
            },
          ]
        );
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

agentPost();
