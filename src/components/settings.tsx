"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Settings() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    about: "",
    avatar_url: "",
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

      const { error } = await supabase
        .from("users")
        .update({
          username: userData.username,
          about: userData.about,
          avatar_url: userData.avatar_url,
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
    <section className="container max-w-5xl py-6 space-y-8 self-center">
      <div>
        <h1 className="text-3xl font-semibold text-white">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start gap-6 h-auto p-0 rounded-none">
          <TabsTrigger
            value="account"
            className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
          >
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
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
                    <p className="text-sm font-medium text-white">
                      Avatar image
                    </p>
                    <p className="text-sm text-zinc-400">
                      JPG or PNG - 1MB max
                    </p>
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
        </TabsContent>

        <TabsContent value="security">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-white">Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-400">Security settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
