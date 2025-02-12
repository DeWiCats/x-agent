"use client";

import { useAgents } from "@/hooks/useAgents";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tables } from "@/types/database.types";
import Image from "next/image";
import { useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import TeamSelection from "@/components/team-selection";

function PostCard({
  post,
  agent,
}: {
  post: Tables<"posts">;
  agent: Tables<"agents">;
}) {
  return (
    <article className="border-b border-zinc-800 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            {agent.avatar && (
              <AvatarImage src={agent.avatar} alt={agent.username || ""} />
            )}
            <AvatarFallback>{agent.username}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{agent.username}</span>
              <span className="text-zinc-500">{agent.username}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-500">
                {new Date(post.timestamp * 1000).toLocaleString()}
              </span>
            </div>
            {post.status && (
              <Badge
                variant="secondary"
                className="bg-amber-900/30 text-amber-500 hover:bg-amber-900/40 border-0"
              >
                {post.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="text-white space-y-3">
          {/* TODO: Get HTML from webscraper */}
          <p>{post.content}</p>
        </div>

        {post.media_id && (
          <div className="flex justify-center">
            <Image
              src={post.media_id}
              alt={post.media_id || ""}
              width={1080}
              height={1080}
            />
          </div>
        )}

        {/* TODO: Get metrics from webscraper */}
        {/* <div className="flex gap-6 text-zinc-500">
          <button className="flex items-center gap-2 hover:text-zinc-300">
            <MessageSquare className="h-4 w-4" />
            <span>{post.metrics.replies.toString().padStart(2, "0")}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-zinc-300">
            <Repeat2 className="h-4 w-4" />
            <span>{post.metrics.reposts.toString().padStart(2, "0")}</span>
          </button>
          <button className="flex items-center gap-2 hover:text-zinc-300">
            <Heart className="h-4 w-4" />
            <span>{post.metrics.likes.toString().padStart(2, "0")}</span>
          </button>
        </div> */}
      </div>
    </article>
  );
}

function Feed() {
  const { agents, getTweets, postsByAgent } = useAgents();

  console.log("agents: ", agents);

  useEffect(() => {
    if (agents?.length > 0) {
      getTweets(agents[0]);
    }
  }, [agents, getTweets]);

  return (
    <div className="h-full mt-12 max-w-2xl mx-auto divide-zinc-800 bg-white bg-opacity-5 rounded-t-[2rem] overflow-hidden">
      <div className="h-full overflow-auto">
        {agents?.length > 0 &&
          postsByAgent[agents[0].id] &&
          postsByAgent[agents[0].id].map((post) => (
            <PostCard key={post.id} post={post} agent={agents[0]} />
          ))}
      </div>
    </div>
  );
}

const FeedWrapper = () => {
  const { user } = useUsers();

  if (!user?.team) {
    return <TeamSelection />;
  }

  return <Feed />;
};

export default FeedWrapper;
