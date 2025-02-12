"use client";

import { useAgents } from "@/hooks/useAgents";
import { useEffect } from "react";
import { useUsers } from "@/hooks/useUsers";
import TeamSelection from "@/components/team-selection";
import PostCard from "@/components/post-card";

function Feed() {
  const { agents, getTweets, postsByAgent } = useAgents();

  useEffect(() => {
    if (agents?.length > 0) {
      getTweets(agents[0]);
    }
  }, [agents, getTweets]);

  return (
    <div className="h-full mt-12 max-w-2xl min-w-[672px] mx-auto bg-sline-alpha-dark-050 rounded-t-3xl overflow-hidden relative z-10 border border-border border-b-0">
      <div className="absolute bottom-0 left-0 w-full h-12 z-10 bg-gradient-to-t from-sline-base-surface-1 to-transparent pointer-events-none" />
      <div className="h-full overflow-auto divide-y divide-border">
        {agents === undefined ? (
          <div className="flex justify-center items-center h-full bg-sline-base-surface-1 text-sline-text-dark-primary text-3xl">
            Loading...
          </div>
        ) : agents.length === 0 ? (
          <div className="flex justify-center items-center h-full bg-sline-base-surface-1 text-sline-text-dark-primary text-3xl">
            No agents found
          </div>
        ) : (
          postsByAgent[agents[0].id]?.map((post) => (
            <PostCard key={post.id} post={post} agent={agents[0]} />
          ))
        )}
      </div>
    </div>
  );
}

const FeedWrapper = () => {
  const { user } = useUsers();

  if (user && !user.team) {
    console.log("No team found");
    return <TeamSelection />;
  }

  return <Feed />;
};

export default FeedWrapper;
