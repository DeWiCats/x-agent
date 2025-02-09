import dotenv from "dotenv";
dotenv.config();

export const config = {
  supabase: {
    url: process.env.SUPABASE_URL || "",
    anonKey: process.env.SUPABASE_KEY || "",
  },
  veniceToken: process.env.VENICE_TOKEN || "",
};
