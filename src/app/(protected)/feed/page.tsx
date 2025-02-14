import CustomPostButton from "@/components/custom-post-button";
import Feed from "@/components/feed";
import { getUserData } from "@/utils/supabase/server/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function FeedPage() {
  const supabase = await createClient();
  const userData = await getUserData();

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("team", userData?.team || 0);

  if (!userData?.team) {
    redirect("/team-creation");
  }
  
  if (!agents || agents.length === 0) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="text-center animate-fade-in">
          <div className="mb-6 animate-bounce">
            <span className="text-4xl">🤖</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No Agents Found
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Create an agent to get started with your feed
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CustomPostButton agents={agents} />
      {/* TODO: Add way to select active agent - and/or pin agent to the homepage */}
      <Feed teamId={userData?.team || 0} agentId={agents?.[0]?.id || 0} />
    </>
  );
}
