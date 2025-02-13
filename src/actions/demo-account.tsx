"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signInForDemo() {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: "sline-ai-safeathon@outlook.com",
    password: "Password1!",
  });

  if (error) {
    console.error(error);
  }

  await supabase.auth.getUser();

  console.log("logged in with demo account");

  redirect("/feed");
}
