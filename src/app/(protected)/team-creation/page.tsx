"use client";

import { createTeam } from "@/actions/teams";
import { FormMessage } from "@/components/forms/form-message";
import { SubmitButton } from "@/components/forms/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function TeamCreation() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-8 md:space-y-6">
        <div className="text-center space-y-3 md:space-y-2">
          <Image
            src="/SlineLogo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold text-white">Create Team</h1>
          <p className="text-gray-400 text-sm px-4 md:px-0">
            Create a new team to collaborate with others
          </p>
        </div>

        <div className="space-y-6 md:space-y-4">
          <form className="flex flex-col gap-6 md:gap-4" action={createTeam}>
            <div className="flex flex-col gap-2">
              <Label className="text-white opacity-75" htmlFor="name">
                Team Name
              </Label>
              <Input
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 h-12 md:h-10"
                name="name"
                placeholder="My Awesome Team"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-white opacity-75" htmlFor="description">
                Description
              </Label>
              <Textarea
                className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
                name="description"
                placeholder="What's your team about?"
                required
              />
            </div>

            <SubmitButton
              className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 md:h-10 text-base md:text-sm"
              pendingText="Creating team..."
            >
              Create Team
            </SubmitButton>

            <FormMessage
              message={
                message
                  ? { message }
                  : { message: "" }
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}
