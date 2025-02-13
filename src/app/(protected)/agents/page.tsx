import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/utils/supabase/server";
import { getUserData } from "@/utils/supabase/server/helpers";
import { Clock } from "lucide-react";
import Image from "next/image";

const tabs = [
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
    <>
      <div>
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">Agents</h1>
        </div>

        <Tabs defaultValue="my-agents" className="mb-8">
          <TabsList className="w-full justify-start gap-6 h-auto p-0 rounded-none border-b border-sline-base-border-alpha">
            <div className="container flex mx-auto px-4 w-full justify-start gap-6 h-auto p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="bg-transparent relative pb-4 text-sline-text-dark-secondary data-[state=active]:text-sline-text-dark-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none capitalize data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-sline-state-brand-active"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {agents?.map((agent) => (
            <Card
              key={agent.id}
              className="bg-sline-alpha-dark-050 border-sline-base-border-alpha overflow-hidden rounded-2xl"
            >
              <div className="px-1.5 pt-1.5">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={agent.avatar || "/placeholder.svg"}
                    alt={agent.username || "Agent"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {agent.username}
                  </h3>
                </div>
                <div className="flex items-center justify-between text-sm text-sline-text-dark-secondary">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      Created on{" "}
                      {new Date(agent.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{agent.users}</span>
                    </div>
                    {agent.revenue && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>{agent.revenue}</span>
                      </div>
                    )} */}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
