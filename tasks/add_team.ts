import { supabase } from "./utils/supabase.api";

const addTeam = async () => {
  const res = await supabase.from("teams").upsert({
    name: "DeWiCats",
    description: "Meow.",
    image_uri:
      "https://www.dewicats.xyz/_next/image?url=%2Fassets%2FdewiCatEyes.png&w=96&q=75",
  });

  console.log(res);
};

addTeam();
