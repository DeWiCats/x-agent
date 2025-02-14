import { Tables } from "@/types/database.types";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";
import { imagePlaceholder } from "@/utils/utils";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function PostCard({
  post,
  agent,
  className,
}: {
  post: Tables<"posts">;
  agent: Tables<"agents">;
  className?: string;
}) {
  return (
    <article className={cn("p-4 relative", className)}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 items-center">
          <Avatar className="h-10 w-10">
            {agent.avatar && (
              <AvatarImage src={agent.avatar} alt={agent.username || ""} />
            )}
            <AvatarFallback>{agent.username}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex flex-col">
              <span className="font-semibold text-sline-text-dark-primary">
                {agent.username}
              </span>
              <span className="text-sline-text-dark-tertiary text-xs md:text-base">
                {post.timestamp &&
                  new Date(post.timestamp * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
              </span>
            </div>
            {post.status && (
              <Badge
                variant="secondary"
                className="bg-sline-state-success-active text-sline-text-light-primary hover:bg-sline-state-success-active/80 border-0 absolute md:top-5 top-10 right-4"
              >
                {post.status}
              </Badge>
            )}
          </div>
        </div>
        <p className="text-sline-text-dark-primary">{post.content}</p>
        <div className="text-white space-y-3 flex flex-row gap-4">
          {/* TODO: Get HTML from webscraper */}
          {post.media_url && (
            <div className="flex justify-center relative rounded-3xl border border-sline-base-border-alpha aspect-square w-3/4 mx-auto overflow-hidden">
              <Image
                className="object-cover"
                src={post.media_url}
                fill
                sizes="(max-width: 768px) 100vw, 75vw"
                loading="lazy"
                quality={75}
                alt={`Post image by ${agent.username}`}
                placeholder={imagePlaceholder}
              />
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between items-center gap-2">
          {post.x_url && (
            <Button
              className="text-sline-text-dark-secondary hover:text-sline-text-dark-primary hover:bg-sline-alpha-dark-050 rounded-xl"
              asChild
            >
              <a
                href={post.x_url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-sline-text-dark-secondary"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Source
              </a>
            </Button>
          )}
          {post.score !== null && (
            <div
              className={`inline-flex items-center px-2 py-1 rounded-lg text-sm ${
                post.score < 50
                  ? "bg-red-900/30 text-red-500"
                  : post.score < 75
                  ? "bg-orange-900/30 text-orange-500"
                  : "bg-green-900/30 text-green-500"
              }`}
            >
              Score: {post.score}
            </div>
          )}
        </div>

        {/* TODO: Get metrics from webscraper */}
        {/* <div className="flex gap-6 text-zinc-500">
            <button className="flex items-center gap-2 hover:text-zinc-300">
              <MessageSquare className="h-4 w-4" />
              <span>{post.metrics.replies.toString().padStart(2, "0")}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-zinc-300">
              <Repeat2 className="h-4 w-4" />
              <span>{post.metrics.reposts.toString().padStart(2, "0")}</span>
            </button>
            <button className="flex items-center gap-2 hover:text-zinc-300">
              <Heart className="h-4 w-4" />
              <span>{post.metrics.likes.toString().padStart(2, "0")}</span>
            </button>
          </div> */}
      </div>
    </article>
  );
}
