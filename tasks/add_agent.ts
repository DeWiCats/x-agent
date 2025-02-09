import { supabase } from "./utils/supabase.api";

const addAgent = async () => {
  const res = await supabase.from("agents").upsert({
    team: 1,
    username: "",
    password: "",
  });

  console.log(res);
};

addAgent();
