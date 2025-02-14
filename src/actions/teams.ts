"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTeam(formData: FormData) {
  const supabase = createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Insert team and return the created team data
  const { data: team, error: teamError } = await supabase
    .from("teams")
    .insert({
      name,
      description,
    })
    .select()
    .single();

  if (teamError) {
    redirect("/team-creation?message=" + teamError.message);
  }

  // Create team membership for the user
  const { error: membershipError } = await supabase
    .from("users")
    .update({
      team: team.id,
    })
    .eq("id", user.id);

  if (membershipError) {
    redirect("/team-creation?message=" + membershipError.message);
  }

  revalidatePath("/feed");
  redirect("/feed");
} 