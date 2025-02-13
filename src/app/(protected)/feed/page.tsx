import CustomPostButton from "@/components/custom-post-button";
import Feed from "@/components/feed";
import { getUserData } from "@/utils/supabase/server/helpers";
import { createClient } from "@/utils/supabase/server";

export default async function FeedPage() {
  const supabase = await createClient();
  const userData = await getUserData();

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("team", userData?.team || 0);

  if (!agents || agents.length === 0) {
    return <div>No agents found</div>;
  }

  return (
    <>
      <CustomPostButton agents={agents} />
      {/* TODO: Add way to select active agent - and/or pin agent to the homepage */}
      <Feed teamId={userData?.team || 0} agentId={agents?.[0]?.id || 0} />
    </>
  );
}
