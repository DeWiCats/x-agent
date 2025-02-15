"use client";

import Link from "next/link";
// import { ChevronDown } from "lucide-react";
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
import { useAsync } from "react-use";
import { useState } from "react";
import dynamic from "next/dynamic";

const ConnectButton = dynamic(
  async () => await import("@dewicats/connect-button"),
  { ssr: false }
);

const navItems = [
  {
    href: "/feed",
    label: "Feed",
    icon: (
      <svg
        className="h-6 w-6"
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
    ),
  },
  {
    href: "/agents",
    label: "Agents",
    icon: (
      <svg
        className="h-6 w-6"
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
    ),
  },
];

export function Navbar() {
  const { user } = useUsers();
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const [team, setTeam] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useAsync(async () => {
    if (!user?.team) {
      return;
    }

    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .eq("id", user?.team);
    if (error) {
      console.error(error);
    }

    console.log(data);
    if (data) {
      setTeam(data[0].name);
    }
  }, [user?.team]);

  async function signOut(): Promise<void> {
    await supabase.auth.signOut();
    router.push("/sign-in");
  }

  return (
    <nav className="flex h-14 items-center justify-between px-4 relative z-50">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Image
            src="/SlineLogo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="mx-auto"
          />
        </Button>
        <Image src="/line.svg" alt="line" width={16} height={16} />
        <DropdownMenu>
          {/* <DropdownMenuTrigger asChild> */}
          <Button
            variant="ghost"
            className="text-sline-text-dark-secondary hover:text-sline-text-dark-primary hover:bg-sline-alpha-dark-050 rounded-xl"
          >
            <span className="font-semibold">{team}</span>
            {/* <ChevronDown className="h-4 w-4" /> */}
          </Button>
          {/* </DropdownMenuTrigger> */}
          {/* <DropdownMenuContent className="bg-sline-alpha-dark-050 border-border text-sline-text-dark-primary rounded-xl">
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
          </DropdownMenuContent> */}
        </DropdownMenu>
      </div>

      {/* Animated hamburger button */}
      <button
        className="md:hidden text-white relative z-50 w-6 h-6"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <div className="relative w-6 h-6">
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "rotate-45 translate-y-2.5" : "translate-y-1"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "opacity-0" : "translate-y-3"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
              mobileMenuOpen ? "-rotate-45 translate-y-2.5" : "translate-y-5"
            }`}
          />
        </div>
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center gap-6">
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

      {/* Desktop profile section */}
      <div className="hidden md:flex items-center gap-2">
        <CreateAgentDrawer />
        <ConnectButton />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user?.avatar_url || "/default-avatar.png"}
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

      {/* Mobile menu with staggered animations */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-lg font-medium transition-all duration-500 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              } ${
                pathname === item.href
                  ? "text-white"
                  : "text-sline-text-dark-secondary hover:text-sline-text-dark-primary"
              }`}
              style={{
                transitionDelay: `${150 + index * 100}ms`,
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          <div
            className={`transition-all duration-500 transform ${
              mobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <div className="flex items-center gap-2 text-lg font-medium text-sline-text-dark-secondary hover:text-sline-text-dark-primary">
              <svg
                className="h-6 w-6"
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
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              <CreateAgentDrawer />
            </div>
          </div>

          <div
            className={`transition-all duration-500 transform ${
              mobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <ConnectButton />
          </div>

          <button
            onClick={() => {
              signOut();
              setMobileMenuOpen(false);
            }}
            className={`flex items-center gap-2 text-lg font-medium text-sline-text-dark-secondary hover:text-sline-text-dark-primary transition-all duration-500 transform ${
              mobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <svg
              className="h-6 w-6"
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
