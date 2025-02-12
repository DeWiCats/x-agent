"use client";

import Link from "next/link";
import { Bell, ChevronDown, Search, Wallet2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { CreateAgentDrawer } from "@/components/create-agent-drawer";
import { useUsers } from "@/hooks/useUsers";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
export function Navbar() {
  const { user } = useUsers();
  const supabase = createClient();
  const router = useRouter();
  if (!user) {
    return null;
  }

  async function signOut(): Promise<void> {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="flex h-14 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Image src="/icon.svg" alt="logo" width={24} height={24} />
        </Button>
        <Image src="/line.svg" alt="line" width={16} height={16} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-sline-text-dark-secondary hover:text-sline-text-dark-primary"
            >
              <span className="font-semibold">DeWiCats</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuItem className="hover:bg-slate-100 cursor-pointer">Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="hover:bg-slate-100 cursor-pointer">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/feed"
          className="flex items-center gap-2 text-sm font-medium text-sline-text-dark-secondary hover:text-sline-text-dark-primary"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="18" rx="2" width="18" x="3" y="3" />
            <path d="M3 9h18" />
            <path d="M9 21V9" />
          </svg>
          Feed
        </Link>
        <Link
          href="/agents"
          className="flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Agents
        </Link>
        {/* <Link
          href="/wallets"
          className="flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300"
        >
          <Wallet2 className="h-5 w-5" />
          Wallets
        </Link> */}
      </div>

      <div className="flex items-center gap-2">
        <CreateAgentDrawer></CreateAgentDrawer>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-zinc-400 hover:text-white"
        >
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-08%20at%201.19.01%E2%80%AFPM-QRFYauyQLW1SzDGm0V3ddEYuUmrtig.png"
            alt="User avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
