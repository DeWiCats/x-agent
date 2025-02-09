import { supabase } from "./utils/supabase.api";

const addUser = async () => {
  const res = await supabase.from("users").upsert({
    team: 1,
    role: "user",
    first_name: "",
    last_name: "",
    email: "",
  });

  console.log(res);
};

addUser();
