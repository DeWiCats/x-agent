import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
import { getScraper } from "../../../../tasks/utils/scraper.api";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const profileName = formData.get("profileName") as string;
  const profileImage = formData.get("profileImage") as File;
  const agentId = formData.get("agentId") as string;

  if (!profileName || !profileImage) {
    return NextResponse.json(
      {
        message: "Profile name and profile image are required",
      },
      { status: 400 }
    );
  }

  const supabase = await createAdminClient();
  const agent = await supabase
    .from("agents")
    .select("*, accounts!inner(*)")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .eq("id", agentId as any)
    .single();

  if (!agent?.data) {
    return NextResponse.json(
      {
        message: "Agent not found",
      },
      { status: 404 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const scraper = await getScraper(agent.data);

  await scraper.updateProfile({
    name: profileName,
  });

  await scraper.uploadImage({
    imageFile: profileImage as File,
  });

  const response = NextResponse.json({
    message: "Profile Updated Successfully! 🚀",
  });

  return response;
}
