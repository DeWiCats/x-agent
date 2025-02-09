source .env
export SUPABASE_ACCESS_TOKEN=$SUPABASE_ACCESS_TOKEN
supabase gen types typescript --project-id zpxvejzhxgkjyabwlssd > tasks/utils/database.types.ts