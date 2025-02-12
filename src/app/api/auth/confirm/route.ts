// /api/auth/confirm

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("token_hash");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({
      token_hash: code,
      type: "email",
    });

    if (error) {
      console.error(error);
    }

    await supabase.auth.getUser();
    return NextResponse.redirect(requestUrl.origin);
  }

  return NextResponse.json({ message: "No code provided" }, { status: 400 });
}
