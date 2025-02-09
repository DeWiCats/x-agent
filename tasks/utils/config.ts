import dotenv from "dotenv";
dotenv.config();

export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    key: process.env.SUPABASE_KEY || "",
  },
  veniceToken: process.env.VENICE_TOKEN || "",
};
