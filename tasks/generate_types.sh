source .env
export SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN
npx supabase gen types typescript --project-id zpxvejzhxgkjyabwlssd > types/database.types.ts