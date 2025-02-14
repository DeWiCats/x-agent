import { NextResponse } from "next/server";

const VENICE_API_KEY = process.env.VENICE_TOKEN;
const VENICE_API_BASE = process.env.VENICE_BASE_URL + "/image";


// Generate image
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VENICE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${VENICE_API_BASE}/generate`, options);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
