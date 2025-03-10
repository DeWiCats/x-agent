"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import dynamic from "next/dynamic";

const ConnectButton = dynamic(
  async () => await import("@dewicats/connect-button"),
  { ssr: false }
);

export default function Settings() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<{
    username: string;
    email: string;
    about: string;
    avatar_url: string;
    file: File | null;
  }>({
    username: "",
    email: "",
    about: "",
    avatar_url: "",
    file: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        if (data) {
          setUserData({
            username: data.username || "",
            email: data.email || "",
            about: data.about || "",
            avatar_url: data.avatar_url || "",
            file: null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [supabase]);

  const handleSave = async () => {
    try {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      if (!userData.file) throw new Error("No file found");

      const uploadPath = `users/${user.id}/avatar.png`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(uploadPath, userData.file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.log("Error uploading image: ", uploadError);
        // TODO: Add a log to sentry or some other logger
        throw uploadError;
      }

      console.log("Got publicUrl");

      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(uploadPath);

      const { error } = await supabase
        .from("users")
        .update({
          ...(userData.username ? { username: userData.username } : {}),
          ...(userData.about ? { about: userData.about } : {}),
          ...(userData.avatar_url ? { avatar_url: publicUrl } : {}),
        })
        .eq("id", user.id);

      if (error) throw error;
      router.refresh();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container max-w-5xl mx-auto py-6 space-y-8 self-center">
      <Card className="border-border bg-sline-alpha-dark-050 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-white">Personal information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 bg-sline-alpha-dark-050 border border-border rounded-2xl">
            <Avatar className="h-16 w-16 relative">
              <AvatarImage
                id="avatar-preview"
                src={userData.avatar_url || "/default-avatar.png"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex self-center w-full justify-between relative">
              <div>
                <p className="text-sm font-medium text-white">Avatar image</p>
                <p className="text-sm text-zinc-400">JPG or PNG - 1MB max</p>
              </div>
              <label
                htmlFor="avatar-upload"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mt-2 text-white cursor-pointer"
              >
                Upload or generate new
              </label>
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size > 1024 * 1024) {
                      alert("File size must be less than 1MB");
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      if (e.target?.result) {
                        setUserData((prev) => ({
                          ...prev,
                          avatar_url: e?.target?.result as string,
                          file,
                        }));
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-400">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-zinc-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={userData.email}
              disabled
              className="bg-zinc-800 border-transparent text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="about" className="text-zinc-400">
              About
            </Label>
            <Textarea
              id="about"
              placeholder="Tell us about yourself"
              value={userData.about}
              onChange={(e) =>
                setUserData({ ...userData, about: e.target.value })
              }
              className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[120px]"
            />
          </div>

          <div className="flex justify-end">
            <Button
              className="bg-zinc-800 text-white hover:bg-zinc-700"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export const WalletsSettings = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold text-white">Connected Wallets</h2>
      <ConnectButton disableMagicLink />
    </div>
  );
};
