import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
import { getScraper } from "@/utils/scraper.api";
import { createImage } from "@/utils/venice.api";
import { ImageStyle } from "@/lib/types";
import { generateMemeWorthyTweet } from "@/utils/twitter.api";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const { agentId, tweetPrompt, imagePrompt } = await req.json();

  if (!agentId || !tweetPrompt) {
    return NextResponse.json(
      {
        message: "Agent ID and tweet prompt are required",
      },
      { status: 400 }
    );
  }

  const supabase = await createAdminClient();
  const agent = await supabase
    .from("agents")
    .select("*, accounts!inner(*)")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq("id", agentId as any)
    .single();

  if (!agent?.data) {
    return NextResponse.json(
      {
        message: "Agent not found",
      },
      { status: 404 }
    );
  }

  const scraper = await getScraper(agent.data);

  let imageBuffer: Buffer | undefined;

  if (imagePrompt) {
    const imageResponse = await createImage({
      trend: tweetPrompt,
      scrapedTweets: [],
      stylePreset: agent.data.image_style as ImageStyle,
    });
    const image = imageResponse.images[0];
    if (!image) {
      return NextResponse.json(
        {
          message: "Error generating image",
        },
        { status: 500 }
      );
    }

    imageBuffer = Buffer.from(image, "base64");
  }

  const tweet = await generateMemeWorthyTweet({
    agent: agent.data,
    tweetContext: tweetPrompt,
    scrapedTweets: [],
  });

  if (!tweet) {
    return NextResponse.json(
      {
        message: "Error generating tweet",
      },
      { status: 500 }
    );
  }

  const tweetResponse = await scraper.sendTweet(
    tweet.content,
    undefined,
    imageBuffer
      ? [
          {
            data: imageBuffer,
            mediaType: "image/png",
          },
        ]
      : []
  );

  if (!tweetResponse) {
    return NextResponse.json(
      {
        message: "Error sending tweet",
      },
      { status: 500 }
    );
  }

  await supabase.from("posts").insert({
    agent: agent.data.id,
    content: tweet.content,
    media_base64: imageBuffer ? imageBuffer.toString("base64") : undefined,
    status: "published",
    score: tweet.score,
  });
  // update last posted date
  await supabase
    .from("agents")
    .update({
      last_posted_date: new Date().toDateString(),
    })
    .eq("id", agent.data.id);

  const response = NextResponse.json({
    message: "Tweet published successfully! 🚀",
  });

  return response;
}
