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
    <article className="p-4">
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
              <span className="font-semibold text-sline-text-dark-primary">
                {agent.username}
              </span>
              <span className="text-sline-text-dark-secondary">·</span>
              <span className="text-sline-text-dark-tertiary">
                {post.timestamp &&
                  new Date(post.timestamp * 1000).toLocaleString()}
              </span>
            </div>
            {post.status && (
              <Badge
                variant="secondary"
                className="bg-sline-state-success-active text-sline-text-light-primary hover:bg-sline-state-success-active/80 border-0"
              >
                {post.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="text-white space-y-3 flex flex-row gap-4">
          {/* TODO: Get HTML from webscraper */}

          {post.media_url && (
            <div className="flex justify-center">
              <Image
                className="rounded-3xl border border-sline-base-border-alpha"
                src={post.media_url}
                alt={post.media_url || ""}
                width={200}
                height={200}
                style={{
                  minWidth: "200px",
                  minHeight: "200px",
                }}
              />
            </div>
          )}

          {post?.media_base64 && !post?.media_url && (
            <div className="flex justify-center">
              <Image
                src={`data:image/jpeg;base64,${post.media_base64}`}
                alt={post.media_base64 || ""}
                width={200}
                height={200}
              />
            </div>
          )}
          <p>{post.content}</p>
        </div>
        <div className="mt-2 flex justify-end">
          {post.score !== null && (
            <div
              className={`inline-flex items-center px-2 py-1 rounded-lg text-sm ${
                post.score < 50
                  ? "bg-red-900/30 text-red-500"
                  : post.score < 75
                  ? "bg-orange-900/30 text-orange-500"
                  : "bg-green-900/30 text-green-500"
              }`}
            >
              Score: {post.score}
            </div>
          )}
        </div>

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
    <div className="h-full mt-12 max-w-2xl mx-auto bg-sline-alpha-dark-050 rounded-t-3xl overflow-hidden relative z-10 border border-border border-b-0">
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-sline-base-surface-1 to-transparent" />
      <div className="h-full overflow-auto divide-y divide-border">
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
    console.log("No team found");
    return <TeamSelection />;
  }

  return <Feed />;
};

export default FeedWrapper;
