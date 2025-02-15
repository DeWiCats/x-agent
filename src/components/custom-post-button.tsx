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
import { ImageStyle } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Add enum for supported languages
enum PostLanguage {
  English = "english",
  Spanish = "spanish",
  French = "french",
}

export default function CustomPostButton({
  agents,
}: {
  agents: Database["public"]["Tables"]["agents"]["Row"][];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [includeImage, setIncludeImage] = useState(false);
  const [textPrompt, setTextPrompt] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [replyToUrl, setReplyToUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imageStyle, setImageStyle] = useState<ImageStyle>(ImageStyle.Anime);
  const [language, setLanguage] = useState<PostLanguage>(PostLanguage.English);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tweetId = replyToUrl.split("/").pop();

      await fetch("/api/publish_tweet", {
        method: "POST",
        body: JSON.stringify({
          tweetPrompt: textPrompt,
          imagePrompt: includeImage ? imagePrompt : undefined,
          imageStyle: includeImage ? imageStyle : undefined,
          tweetId: tweetId || undefined,
          agentId: agents[0].id,
          language,
        }),
      });

      setShowSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        // Reset form after closing
        setTextPrompt("");
        setImagePrompt("");
        setReplyToUrl("");
        setIncludeImage(false);
        setShowSuccess(false);
        // Trigger a page refresh
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Failed to publish tweet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="group fixed bottom-4 right-4 z-50">
            <Button
              className="rounded-2xl w-12 h-12 
                bg-sline-alpha-dark-100 hover:bg-sline-alpha-dark-200 
                text-sline-text-dark-primary shadow-lg
                hover:scale-105 transition-transform duration-200
                md:bg-sline-alpha-dark-050 md:hover:bg-sline-alpha-dark-100"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircle className="size-6 animate-pulse" />
            </Button>
            <div
              className="absolute bottom-full right-0 mb-2 
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              pointer-events-none"
            >
              <div
                className="bg-sline-base-surface-1 text-sline-text-dark-primary 
                px-3 py-1.5 rounded-lg shadow-lg text-sm whitespace-nowrap
                border border-sline-base-border-alpha"
              >
                Create custom post
              </div>
              <div
                className="absolute -bottom-1 right-5 w-2 h-2 
                bg-sline-base-surface-1 border-r border-b border-sline-base-border-alpha
                transform rotate-45"
              ></div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] 
          bg-sline-base-surface-1 text-sline-text-dark-primary 
          border-sline-base-border-alpha
          fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
          h-[100dvh] w-full rounded-none p-6
          sm:h-auto sm:w-[95%] sm:max-h-[90vh]"
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              {showSuccess ? "Tweet Sent! 🎉" : "Create Post"}
            </DialogTitle>
          </DialogHeader>
          {showSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="text-green-500">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-sline-text-dark-secondary">
                Your tweet has been published successfully!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="language"
                  className="text-sm font-medium text-sline-text-dark-secondary"
                >
                  Post Language
                </Label>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as PostLanguage)}
                >
                  <SelectTrigger
                    id="language"
                    className="w-full bg-sline-alpha-dark-050 border-sline-alpha-dark-050 text-sline-text-dark-primary"
                  >
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent className="bg-sline-base-surface-1 border-sline-base-border-alpha">
                    {Object.values(PostLanguage).map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <div className="space-y-2">
                <Label
                  htmlFor="reply-to"
                  className="text-sm font-medium text-sline-text-dark-secondary"
                >
                  Reply to (optional)
                </Label>
                <Textarea
                  id="reply-to"
                  placeholder="Paste X/Twitter URL to reply to..."
                  value={replyToUrl}
                  onChange={(e) => setReplyToUrl(e.target.value)}
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="image-style"
                      className="text-sm font-medium text-sline-text-dark-secondary"
                    >
                      Image Style
                    </Label>
                    <Select
                      value={imageStyle}
                      onValueChange={(value) =>
                        setImageStyle(value as ImageStyle)
                      }
                    >
                      <SelectTrigger
                        id="image-style"
                        className="w-full bg-sline-alpha-dark-050 border-sline-alpha-dark-050 text-sline-text-dark-primary"
                      >
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                      <SelectContent className="bg-sline-base-surface-1 border-sline-base-border-alpha max-h-[200px] overflow-y-auto">
                        {Object.values(ImageStyle).map((style) => (
                          <SelectItem key={style} value={style}>
                            {style
                              .split("-")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-sline-text-dark-primary bg-sline-state-brand-active hover:bg-sline-state-brand-active/90 rounded-xl relative"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Publishing...
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
