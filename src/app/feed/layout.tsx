import { AgentsProvider } from "@/hooks/useAgents";

export default function FeedLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <AgentsProvider>
        {children}
      </AgentsProvider>
    </>
  );
}