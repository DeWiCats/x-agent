"use server";

import { AgentFormData } from "@/lib/types";

export async function createAgent(formData: AgentFormData) {
  console.log(formData);
}