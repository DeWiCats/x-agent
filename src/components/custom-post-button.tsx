"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { Database } from "@/types/database.types";

export default function CustomPostButton({
  agents,
}: {
  agents: Database["public"]["Tables"]["agents"]["Row"][];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [includeImage, setIncludeImage] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ textPrompt, includeImage, imagePrompt });
    // Handle form submission logic here
    await fetch("/api/publish_tweet", {
      method: "POST",
      body: JSON.stringify({
        tweetPrompt: textPrompt,
        imagePrompt: includeImage ? imagePrompt : undefined,
        // TODO: Add Support to multiple agents by exposing selectedAgentId
        agentId: agents[0].id,
      }),
    });
    setIsOpen(false);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-2xl w-12 h-12 bg-sline-alpha-dark-050 hover:bg-sline-alpha-dark-100 text-sline-text-dark-primary shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <PlusCircle className="size-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-sline-base-surface-1 text-sline-text-dark-primary border-sline-base-border-alpha rounded-3xl">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="text-prompt"
                className="text-sm font-medium text-sline-text-dark-secondary"
              >
                What is the post about?
              </Label>
              <Textarea
                id="text-prompt"
                placeholder="Enter your text prompt here..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="w-full bg-sline-alpha-dark-050 border-sline-alpha-dark-050 text-sline-text-dark-primary placeholder:text-sline-text-dark-secondary"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-image"
                checked={includeImage}
                onCheckedChange={(checked) =>
                  setIncludeImage(checked as boolean)
                }
                className="border-sline-base-border rounded-md border data-[state=checked]:bg-sline-state-brand-selected data-[state=checked]:text-sline-text-dark-primary"
              />
              <Label
                htmlFor="include-image"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sline-text-dark-secondary"
              >
                Include an image?
              </Label>
            </div>
            {includeImage && (
              <div className="space-y-2">
                <Label
                  htmlFor="image-prompt"
                  className="text-sm font-medium text-sline-text-dark-secondary"
                >
                  Image Prompt
                </Label>
                <Textarea
                  id="image-prompt"
                  placeholder="Describe the image you want to generate..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full bg-sline-alpha-dark-050 border-sline-alpha-dark-050 text-sline-text-dark-primary placeholder:text-sline-text-dark-secondary"
                />
              </div>
            )}
            <Button
              type="submit"
              className="w-full text-sline-text-dark-primary bg-sline-state-brand-active hover:bg-sline-state-brand-active/90 rounded-xl"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
