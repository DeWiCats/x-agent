"use client";

import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Clock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function AgentCard({ agent }: { agent: any }) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(agent);
  return (
    <>
      <Card
        onClick={() => setIsOpen(true)}
        className="bg-sline-alpha-dark-050 border-sline-base-border-alpha overflow-hidden rounded-2xl hover:border-white/20 transition-colors cursor-pointer"
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
            <h3 className="text-lg font-medium text-white">{agent.username}</h3>
          </div>
          <div className="flex items-center justify-between text-sm text-sline-text-dark-secondary">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>
                Created on {new Date(agent.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {/* ... existing metrics ... */}
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto [&>button]:text-white">
          <DialogTitle className="text-white">Agent Details</DialogTitle>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="relative w-16 h-16 overflow-hidden rounded-xl">
                <Image
                  src={agent.avatar || "/placeholder.svg"}
                  alt={agent.username || "Agent"}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-semibold text-white">{agent.username}</h2>
            </div>
            {Object.entries(agent).map(([key, value]) => {
              if (
                ["cookies", "created_at", "id", "team", "updated_at", "account_id", "agent_id", "avatar", "last_posted_date", "tags", "username"].includes(
                  key
                )
              ) {
                return "";
              }
              return (
                <div
                  key={key}
                  className="flex gap-4 border-b border-white/10 pb-2"
                >
                  <span className="font-medium text-white/60 w-32 capitalize">
                    {key.replace(/_/g, " ")}:
                  </span>
                  <span className="text-white">
                    {value instanceof Date
                      ? value.toLocaleString()
                      : String(value)}
                  </span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
