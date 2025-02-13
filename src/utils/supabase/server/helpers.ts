import { Database } from "@/types/database.types";
import { createClient } from "../server";

export async function getUserData(): Promise<
  Database["public"]["Tables"]["users"]["Row"]
> {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.user?.id || "")
    .single();

  if (!userData) {
    throw new Error("User not found");
  }

  return userData;
}

export async function updateUser(
  user: Database["public"]["Tables"]["users"]["Row"]
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
