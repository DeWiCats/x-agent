import { createClient } from "@/utils/supabase/server";
import PostCard from "@/components/post-card";
import { Database } from "@/types/database.types";
import { VList } from "virtua";

async function getAgentAndPosts(
  teamId: Database["public"]["Tables"]["teams"]["Row"]["id"],
  agentId: Database["public"]["Tables"]["agents"]["Row"]["id"]
) {
  const supabase = await createClient();

  const { data: agent, error: agentError } = await supabase
    .from("agents")
    .select("*")
    .eq("id", agentId)
    .eq("team", teamId)
    .single();

  const { data: posts, error: postsError } = await supabase
    .from("posts")
    .select("*")
    .eq("agent", agentId)
    .order("timestamp", { ascending: false });

  if (postsError) {
    return { posts: [] };
  }

  if (agentError) {
    return { agent: null };
  }

  return { posts, agent };
}

export default async function Feed({
  teamId,
  agentId,
}: {
  teamId: Database["public"]["Tables"]["teams"]["Row"]["id"];
  agentId: Database["public"]["Tables"]["agents"]["Row"]["id"];
}) {
  const { posts, agent } = await getAgentAndPosts(teamId, agentId);

  if (!agent) {
    return (
      <div className="h-full max-w-2xl min-w-[672px] mx-auto bg-sline-alpha-dark-050 rounded-t-3xl overflow-hidden relative z-10 border border-border border-b-0">
        <div className="flex justify-center items-center h-full bg-sline-base-surface-1 text-sline-text-dark-primary text-3xl">
          Agent not found
        </div>
      </div>
    );
  }

  return (
    <div className="h-full max-w-2xl min-w-[672px] mx-auto bg-sline-alpha-dark-050 rounded-t-3xl overflow-hidden relative z-10 border border-border border-b-0">
      <div className="absolute bottom-0 left-0 w-full h-12 z-10 bg-gradient-to-t from-sline-base-surface-1 to-transparent pointer-events-none" />
      {!posts ? (
        <div className="flex justify-center items-center h-full bg-sline-base-surface-1 text-sline-text-dark-primary text-3xl">
          Loading...
        </div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center items-center h-full bg-sline-base-surface-1 text-sline-text-dark-primary text-3xl">
          No posts found
        </div>
      ) : (
        <VList className="h-full divide-y divide-border">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} agent={agent} />
          ))}
        </VList>
      )}
    </div>
  );
}
