import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Navbar } from "@/components/navbar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/sign-in");
  }

  return (
    <>
      {" "}
      <Navbar />
      {children}
    </>
  );
}
