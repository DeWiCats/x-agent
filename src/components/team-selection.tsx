import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useUsers } from "@/hooks/useUsers";
import { Tables } from "@/types/database.types"
import { createClient } from "@/utils/supabase/client";
// import { Users } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function TeamSelection() {
  const router = useRouter();
  const [teams, setTeams] = useState<Tables<"teams">[]>([]);
  const { user } = useUsers();
  const supabase = createClient();

  useEffect(() => {
    const fetchTeams = async () => {
      const { data, error } = await supabase.from("teams").select("*");
      if (error) {
        console.error(error);
      }
      setTeams(data || []);
    };
    fetchTeams();
  }, [supabase]);
  
  const handleJoinTeam = async (teamId: number) => {
    // Handle team join logic here

    const { error } = await supabase.from("users").update({ team: teamId }).eq("id", user!.id);
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Joining team ${teamId}`)
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-white">Choose your team</h1>
          <p className="text-gray-400 text-sm">Select a team to join and start collaborating with your colleagues</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card
              key={team.id}
              className="bg-gray-800/50 border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors"
            >
              <button onClick={() => handleJoinTeam(team.id)} className="w-full p-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-700">
                    <Image
                      src={team.image_uri || "/placeholder.svg"}
                      alt={`${team.name} avatar`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium text-white">{team.name}</h3>
                    {/* <div className="flex items-center text-sm text-gray-400">
                      <Users className="mr-1 h-4 w-4" />
                      {team.members} members
                    </div> */}
                  </div>
                </div>
              </button>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600"
            onClick={() => window.history.back()}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  )
}

