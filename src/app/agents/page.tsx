import AgentsList from "@/components/agents-list";
import { createClient } from "@/utils/supabase/server";

export default async function AgentsPage() {
  const supabase = await createClient();
  const { data: agents } = await supabase.from("agents").select("*");
  return (
    <>
      <AgentsList agents={agents || []} />
    </>
  );
}
