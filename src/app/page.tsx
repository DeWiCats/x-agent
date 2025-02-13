import { redirect } from "next/navigation";

export default function Home() {
  redirect("/feed");
  return <div>Home</div>;
}
