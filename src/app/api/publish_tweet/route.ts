import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
import { getScraper } from "@/utils/scraper.api";
import { createImage } from "@/utils/venice.api";
import { ImageStyle } from "@/lib/types";
import { generateMemeWorthyTweet } from "@/utils/twitter.api";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const {
    agentId,
    tweetPrompt,
    imagePrompt,
    tweetId,
    imageStyle,
    language = "english",
  }: {
    agentId: number;
    tweetPrompt: string;
    imagePrompt: string;
    tweetId: string;
    imageStyle: ImageStyle;
    language?: string;
  } = await req.json();

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
    .eq("id", agentId)
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

  let imageUrl: string | undefined;
  let imageBuffer: Buffer | undefined;

  if (imagePrompt) {
    const imageResponse = await createImage({
      trend: tweetPrompt,
      scrapedTweets: [],
      stylePreset: imageStyle,
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

    const uploadPath = `posts/${agentId}/${crypto.randomUUID()}+${new Date().getTime()}.png`;

    const imageFile = new File([imageBuffer], "post.png", {
      type: "image/png",
    });

    const { error } = await supabase.storage
      .from("images")
      .upload(uploadPath, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("Error uploading image: ", error);
      // TODO: Add a log to sentry or some other logger
      return NextResponse.json(
        {
          message: "Error uploading image",
        },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("images").getPublicUrl(uploadPath);

    imageUrl = publicUrl;
  }

  const tweet = await generateMemeWorthyTweet({
    agent: agent.data,
    tweetContext: tweetPrompt,
    scrapedTweets: [],
    language,
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
    tweetId,
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

  const res = await tweetResponse.json();
  const {
    data: {
      create_tweet: {
        tweet_results: { result },
      },
    },
  } = res;

  const { rest_id } = result;

  const xUrl = `https://x.com/${agent.data.accounts.username}/status/${rest_id}`;

  await supabase.from("posts").insert({
    id: rest_id,
    agent: agent.data.id,
    content: tweet.content,
    media_url: imageUrl,
    status: "published",
    score: tweet.score,
    x_url: xUrl,
    timestamp: Math.floor(Date.now() / 1000),
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
