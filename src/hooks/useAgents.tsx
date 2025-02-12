"use client";

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "../utils/supabase/client";
import { Tables } from "@/types/database.types";

const teamId = 1;

export const useAgentsHook = () => {
  const [agents, setAgents] = useState<Tables<"agents">[]>([]);
  const [postsByAgent, setPostsByAgent] = useState<{
    [key: number]: Tables<"posts">[];
  }>({});

  const supabase = useMemo(() => createClient(), []);

  const getAgents = useCallback(async () => {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("team", teamId);

    if (error) {
      console.error(error);
      return;
    }

    console.log("data: ", data);

    setAgents(data);
  }, [supabase]);

  const getTweets = useCallback(
    async (agent: Tables<"agents">) => {
      if (!agent.id) {
        console.error("Agent ID is required");
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("agent", agent.id);

      if (error) {
        console.error(error);
        return;
      }

      setPostsByAgent((prev) => ({ ...prev, [agent.id]: data }));
    },
    [supabase]
  );

  useEffect(() => {
    getAgents();
  }, [getAgents]);

  return {
    agents,
    getTweets,
    postsByAgent,
  };
};

export type Agents = ReturnType<typeof useAgentsHook>;

const AgentsContext = createContext<Agents | null>(null);

const { Provider } = AgentsContext;

const AgentsProvider = ({ children }: { children: ReactNode }) => {
  return <Provider value={useAgentsHook()}>{children}</Provider>;
};

const useAgents = (): Agents => {
  const context = useContext(AgentsContext);
  if (!context) {
    throw new Error("useAgents has to be used within <AgentsProvider>");
  }
  return context;
};

export { useAgents, AgentsProvider };
