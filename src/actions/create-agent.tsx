"use server";

import { AgentFormData } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

export async function createAgent(formData: AgentFormData) {

  console.log(formData);

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: accountData, error: accountError } = await supabase.from("users").select("*").eq("id", user.id).single();

  if (accountError) {
    throw new Error("Error fetching account");
  }

  const { data, error } = await supabase.from("agents").insert({
    account_id: user.id,
    avatar: formData.image,
    context: formData.context,
    created_at: new Date().toISOString(),
    description: formData.description,
    engagement_hooks: formData.engagementHooks,
    engagement_rules: formData.engagementRules,
    ethical_boundaries: formData.ethicalBoundaries,
    fact_check_threshold: formData.factCheckThreshold,
    image_style: formData.imageStyle ?? 'default',
    last_posted_date: null,
    model: formData.model,
    public: formData.isPublic,
    stance: formData.stance,
    style: formData.style,
    tags: formData.tags,
    team: accountData.team,
    tone: formData.tone,
    username: formData.name,
  });

  if (error) {
    throw new Error("Error creating agent");
  }

  return data;
}
