import {
  PageWithHeader,
  PageWithHeaderContent,
} from "@/components/page-with-header";
import { TabsContent } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/utils/supabase/server/helpers";
import { AgentCard } from "@/components/agents/agent-card";

const tabTriggers = [
  {
    label: "My Agents",
    value: "my-agents",
  },
  {
    label: "Templates",
    value: "templates",
  },
];

export default async function AgentsPage() {
  const supabase = await createClient();
  const userData = await getUserData();
  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("team", userData?.team ?? 0);

  return (
    <PageWithHeader fluid title="Agents" tabTriggers={tabTriggers}>
      <PageWithHeaderContent fluid tabValue="my-agents">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {agents?.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </PageWithHeaderContent>
      <TabsContent value="templates">
        {/* Add your templates content here */}
      </TabsContent>
    </PageWithHeader>
  );
}
