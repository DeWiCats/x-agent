import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, DollarSign, Users } from "lucide-react"
import Image from "next/image"
import { Tables } from "@/types/database.types"

// const agents = [
//   {
//     id: 1,
//     name: "Degen Intern",
//     status: "Public",
//     avatar: "/SlineLogo.svg",
//     creator: "Agnel Nieves",
//     createdAt: "Dec 24",
//     users: 50,
//     revenue: "1k",
//     isDraft: false,
//   },
//   // Duplicate the agent 8 more times for the grid
//   ...Array(8).fill({
//     id: 2,
//     name: "Degen Intern",
//     status: "Draft",
//     avatar: "/SlineLogo.svg",
//     creator: "Agnel Nieves",
//     createdAt: "Dec 24",
//     users: 50,
//     revenue: "1k",
//     isDraft: true,
//   }),
// ]

export default function AgentsPage({ agents }: { agents: Tables<"agents">[] }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Agents</h1>

        <Tabs defaultValue="my-agents" className="mb-8">
          <TabsList className="bg-gray-800 text-gray-400">
            <TabsTrigger value="my-agents" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              My Agents
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Templates
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Community
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
              <div className="relative aspect-square">
                <Image src={agent.avatar || "/placeholder.svg"} alt={agent.username || "Agent"} fill className="object-cover" />
                {/* <Badge
                  className={`absolute top-2 right-2 ${
                    agent.isDraft ? "bg-gray-700 text-gray-300" : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {agent.status}
                </Badge> */}
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{agent.username}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    {/* <Image
                      src="/placeholder.svg?height=20&width=20"
                      alt={agent.username || "Agent"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    /> */}
                    {agent.team}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Created on {new Date(agent.created_at).toLocaleDateString()}</span>
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
    </div>
  )
}

