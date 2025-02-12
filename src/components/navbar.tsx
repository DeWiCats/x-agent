"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
import { useRouter, usePathname } from "next/navigation";
import CreatingProgressLoader from "./creating-progress-loader";

export function Navbar() {
  const { user } = useUsers();
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

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
          <Image src={"/icon.svg"} alt="logo" width={24} height={24} />
        </Button>
        <Image src="/line.svg" alt="line" width={16} height={16} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-sline-text-dark-secondary hover:text-sline-text-dark-primary hover:bg-sline-alpha-dark-050 rounded-xl"
            >
              <span className="font-semibold">DeWiCats</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-sline-alpha-dark-050 border-border text-sline-text-dark-primary rounded-xl">
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="hover:bg-sline-alpha-dark-050 cursor-pointer rounded-lg"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="hover:bg-sline-alpha-dark-050 cursor-pointer rounded-lg"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/feed"
          className={`flex items-center gap-2 text-sm font-medium ${
            pathname === "/feed"
              ? "text-white"
              : "text-sline-text-dark-secondary hover:text-sline-text-dark-primary"
          }`}
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
          className={`flex items-center gap-2 text-sm font-medium ${
            pathname === "/agents"
              ? "text-white"
              : "text-sline-text-dark-secondary hover:text-sline-text-dark-primary"
          }`}
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
        <CreatingProgressLoader />
        {/* <Button
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
        </Button> */}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.avatar_url || "/default-avatar.png"}
                alt="User avatar"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-sline-alpha-dark-050 border-border text-sline-text-dark-primary rounded-xl">
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="hover:bg-sline-alpha-dark-050 cursor-pointer rounded-lg"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => signOut()}
              className="hover:bg-sline-alpha-dark-050 cursor-pointer rounded-lg"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
