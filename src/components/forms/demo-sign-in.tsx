"use client";

import { signInForDemo } from "@/actions/demo-account";
import { Button } from "@/components/ui/button";

export function DemoSignIn() {
  return (
    <Button
      onClick={signInForDemo}
      className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 
        shadow-lg 
        flex items-center gap-2 font-medium text-white h-12 md:h-10"
    >
      Try Safeathon Demo
    </Button>
  );
}
