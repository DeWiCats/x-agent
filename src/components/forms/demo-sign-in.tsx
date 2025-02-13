"use client";

import { signInForDemo } from "@/actions/demo-account";
import { Button } from "@/components/ui/button";

export function DemoSignIn() {
  return <Button onClick={signInForDemo}>Sign in for demo - Safeathon</Button>;
}
