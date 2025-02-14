"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRef, useState } from "react";

export default function AuthPage() {
  const supabase = createClient();
  const inputEl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="text-center space-y-2">
          <Image
            src="/SlineLogo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="mx-auto"
          />
          <h1 className="text-2xl font-semibold text-white">Welcome</h1>
          <p className="text-gray-400 text-sm">
            Enter your email below to create your account
          </p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="name@example.com"
            ref={inputEl}
            className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
          />
          <Button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOtp({
                email: inputEl.current?.value ?? "",
                options: {
                  emailRedirectTo: `${window.location.origin}/feed`,
                },
              });

              // add a loading state
              setLoading(true);

              if (error) {
                console.error(error);
              }
            }}
          >
            Sign In with Email
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {/* <Button
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "github",
              });

              if (error) {
                console.error(error);
              }
            }}
            variant="outline"
            className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <Github className="mr-2 h-4 w-4" />
            Sign in with Github
          </Button> */}
          <Button
            variant="outline"
            onClick={async () => {
              const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
              });

              if (error) {
                console.error(error);
              }
            }}
            className="w-full bg-gray-800/50 border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Sign in with Google
          </Button>
        </div>

        <div className="text-center text-xs text-gray-400">
          By clicking continue, you agree to our{" "}
          <Link href="#" className="hover:text-gray-300 underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="hover:text-gray-300 underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
