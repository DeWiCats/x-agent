import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createAdminClient();

  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("active", false);

  if (error) {
    return NextResponse.json(
      {
        error: "Error fetching accounts",
      },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        accountsFound: false,
      },
      { status: 200 }
    );
  }

  const response = NextResponse.json(
    {
      accountsFound: data?.length > 0,
    },
    { status: 200 }
  );

  return response;
}
