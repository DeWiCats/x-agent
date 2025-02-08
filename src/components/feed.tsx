import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Repeat2, Heart } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  timestamp: string
  status: "Draft" | "Scheduled"
  metrics: {
    replies: number
    reposts: number
    likes: number
  }
}

function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-b border-zinc-800 p-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">{post.author.name}</span>
              <span className="text-zinc-500">{post.author.handle}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-500">{post.timestamp}</span>
            </div>
            {post.status && (
              <Badge variant="secondary" className="bg-amber-900/30 text-amber-500 hover:bg-amber-900/40 border-0">
                {post.status}
              </Badge>
            )}
          </div>
        </div>
        <div className="text-white space-y-3">
          <p>New dashboard to track your API usage is now live</p>
          <p>
            Access private, uncensored inference via our API by staking VVV or upgrading to Pro (rate limits apply to
            Pro)
          </p>
          <p>
            Dashboard here:{" "}
            <Link href="http://venice.ai/settings/api" className="text-blue-400 hover:underline">
              http://venice.ai/settings/api
            </Link>
          </p>
        </div>
        <div className="flex gap-6 text-zinc-500">
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
        </div>
      </div>
    </article>
  )
}

export function Feed() {
  const posts: Post[] = [
    {
      id: "1",
      author: {
        name: "Luna",
        handle: "@DeWiLuna",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.45.53%E2%80%AFPM-KcMa4dtbqAQw2w0Aji1LIpyXe3bYJJ.png",
      },
      content: "New dashboard to track your API usage is now live",
      timestamp: "Feb 7, 2024",
      status: "Draft",
      metrics: {
        replies: 0,
        reposts: 0,
        likes: 0,
      },
    },
    {
      id: "2",
      author: {
        name: "Luna",
        handle: "@DeWiLuna",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.45.53%E2%80%AFPM-KcMa4dtbqAQw2w0Aji1LIpyXe3bYJJ.png",
      },
      content: "New dashboard to track your API usage is now live",
      timestamp: "Feb 7, 2024",
      status: "Scheduled",
      metrics: {
        replies: 0,
        reposts: 0,
        likes: 0,
      },
    },
    {
      id: "3",
      author: {
        name: "Luna",
        handle: "@DeWiLuna",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.45.53%E2%80%AFPM-KcMa4dtbqAQw2w0Aji1LIpyXe3bYJJ.png",
      },
      content: "New dashboard to track your API usage is now live",
      timestamp: "Feb 7, 2024",
      status: "Scheduled",
      metrics: {
        replies: 0,
        reposts: 0,
        likes: 0,
      },
    },
    {
      id: "4",
      author: {
        name: "Luna",
        handle: "@DeWiLuna",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.45.53%E2%80%AFPM-KcMa4dtbqAQw2w0Aji1LIpyXe3bYJJ.png",
      },
      content: "New dashboard to track your API usage is now live",
      timestamp: "Feb 7, 2024",
      status: "Scheduled",
      metrics: {
        replies: 0,
        reposts: 0,
        likes: 0,
      },
    },
    {
      id: "5",
      author: {
        name: "Luna",
        handle: "@DeWiLuna",
        avatar:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.45.53%E2%80%AFPM-KcMa4dtbqAQw2w0Aji1LIpyXe3bYJJ.png",
      },
      content: "New dashboard to track your API usage is now live",
      timestamp: "Feb 7, 2024",
      status: "Scheduled",
      metrics: {
        replies: 0,
        reposts: 0,
        likes: 0,
      },
    },
    // Add more posts as needed
  ]

  return (
    <div className="h-full mt-12 max-w-2xl mx-auto divide-zinc-800 bg-white bg-opacity-5 rounded-t-[2rem] overflow-hidden">
      <div className="h-full overflow-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      </div>
    </div>
  )
}

