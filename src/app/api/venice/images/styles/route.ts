import { NextResponse } from "next/server";

const VENICE_API_KEY = process.env.VENICE_TOKEN;
const VENICE_API_BASE = process.env.VENICE_BASE_URL + "/image";

// Get available styles
export async function GET() {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${VENICE_API_KEY}`,
      },
    };

    const response = await fetch(`${VENICE_API_BASE}/styles`, options);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching styles:", error);
    return NextResponse.json(
      { error: "Failed to fetch styles" },
      { status: 500 }
    );
  }
}
