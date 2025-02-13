import { supabase } from "./supabase.api";
import { Cookie } from "tough-cookie";
import { Database } from "@/types/database.types";
import { Scraper } from "@dewicats/agent-twitter-client";

const getScraper = async (
  agent: Database["public"]["Tables"]["agents"]["Row"] & {
    accounts: Database["public"]["Tables"]["accounts"]["Row"] | null;
  }
) => {
  if (!agent.accounts?.username || !agent.accounts?.password) {
    throw new Error("Agent username or password not found");
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
    await scraper.login(agent.accounts.username, agent.accounts.password);
    const cookies = await scraper.getCookies();
    const jsonCookies = JSON.stringify(cookies);

    // Update cookies in the database
    await supabase
      .from("agents")
      .update({ cookies: jsonCookies })
      .eq("id", agent.id);
  } else {
    console.log("Agent is already logged in");
  }

  return scraper;
};

export { getScraper };
