"use server";

import { AgentFormData } from "@/lib/types";
import { Database } from "@/types/database.types";
import { createAdminClient, createClient } from "@/utils/supabase/server";
import { getScraper } from "../../tasks/utils/scraper.api";

export async function createAgent(formData: AgentFormData) {
  // console.log(formData);
  const response: {
    success: boolean;
    error: string | null;
  } = {
    success: false,
    error: null,
  };

  const supabase = await createClient();

  const supabaseAdmin = await createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    response.error = "User not found";
    return response;
  }

  const { data: accountData, error: accountError } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (accountError) {
    response.error = "Error fetching account";
    return response;
  }

  const { data: openAccountData, error: openAccountError } = await supabaseAdmin
    .from("accounts")
    .select("*")
    .eq("active", false)
    .single();

  if (openAccountError) {
    response.error = "Error fetching open account";
    return response;
  }

  if (!openAccountData) {
    response.error = "No open account found";
    return response;
  }

  const insertData: Database["public"]["Tables"]["agents"]["Insert"] = {
    account_id: openAccountData.id,
    avatar: null,
    context: formData.context,
    created_at: new Date().toISOString(),
    description: formData.description,
    engagement_hooks: formData.engagementHooks,
    engagement_rules: formData.engagementRules,
    ethical_boundaries: formData.ethicalBoundaries,
    fact_check_threshold: formData.factCheckThreshold,
    image_style: "default",
    last_posted_date: null,
    model: formData.model as Database["public"]["Enums"]["model"],
    public: formData.isPublic,
    stance: formData.stance,
    style: formData.style,
    tags: formData.tags.split(","),
    team: accountData.team!,
    tone: formData.tone,
    username: formData.name,
  };

  const { data, error } = await supabase
    .from("agents")
    .insert(insertData)
    .select("*")
    .single();

  if (error) {
    response.error = "Error creating agent";
    console.log(error);
    return response;
  }

  console.log('ID',data?.id);
  const agent = await supabaseAdmin
    .from("agents")
    .select("*, accounts!inner(*)")
    .eq("id", data.id)
    .single();

  if (!agent?.data) {
    console.log(agent.error);
    response.error = "Agent not found";
    return response;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const scraper = await getScraper(agent.data);

  try {
    await scraper.updateProfile({
      name: formData.name,
    });
  } catch (error) {
    console.log("error: ", error);
  }

  let res;
  try {
    console.log('IMAGE',formData.image);
    res = await scraper.uploadImage({
      imageFile: formData.image as File,
    });
    console.log('RES',res);
  } catch (error) {
    console.log("error: ", error);
  }

  await supabase.from("agents").update({
    avatar: res?.avatar,
  }).eq("id", data.id);

  await supabaseAdmin.from("accounts").update({
    active: true,
  }).eq("id", openAccountData.id);

  response.success = true;
  return response;
}
