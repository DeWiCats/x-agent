"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { X, Info, FileText, Globe, Trash2, PenLine } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function CreateAgentDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="bg-white text-black hover:bg-zinc-200"
        >
          Create an agent
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] border-l border-zinc-800 bg-zinc-900 p-0"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-zinc-800 px-4 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-white">
                Create agent
              </SheetTitle>
              <SheetClose className="rounded-full p-2 hover:bg-zinc-800">
                <X className="h-4 w-4 text-zinc-400" />
              </SheetClose>
            </div>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start gap-6 h-auto pb-3">
                {["general", "instructions", "context", "settings"].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white capitalize"
                    >
                      {tab}
                    </TabsTrigger>
                  )
                )}
              </TabsList>

              {/* General Tab */}
              <TabsContent
                value="general"
                className="mt-4 focus-visible:outline-none focus-visible:ring-0"
              >
                <div className="space-y-6 px-4">
                  <div className="mx-auto w-32 h-32 bg-zinc-800 rounded-lg flex items-center justify-center relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            const img = document.getElementById(
                              "preview"
                            ) as HTMLImageElement;
                            if (img && e.target?.result) {
                              img.src = e.target.result as string;
                              img.style.display = "block";
                              const placeholder =
                                document.getElementById("placeholder");
                              if (placeholder)
                                placeholder.style.display = "none";
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Image
                      id="preview"
                      className="w-full h-full object-cover rounded-lg"
                      style={{ display: "none" }}
                      alt="Preview"
                      src="/SlineLogo.svg"
                      width={128}
                      height={128}
                    />
                    <svg
                      id="placeholder"
                      className="text-zinc-600"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    {["name", "handle"].map((field) => (
                      <div key={field} className="space-y-2">
                        <Label
                          htmlFor={field}
                          className="text-zinc-400 capitalize"
                        >
                          {field}
                        </Label>
                        <Input
                          id={field}
                          placeholder="Text"
                          className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600"
                        />
                      </div>
                    ))}
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-zinc-400">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Text"
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[120px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-zinc-400">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-zinc-800 border-transparent text-white">
                          <SelectValue placeholder="Text" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="category1">Category 1</SelectItem>
                          <SelectItem value="category2">Category 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tags" className="text-zinc-400">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        placeholder="Text"
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Instructions Tab */}
              <TabsContent
                value="instructions"
                className="mt-4 focus-visible:outline-none focus-visible:ring-0"
              >
                <div className="space-y-6 px-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Engagement Hooks</Label>
                      <Textarea
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                        placeholder="Enter engagement hooks..."
                        defaultValue='• Always pair charts with cat memes&#13;• End threads with "GM or GN?" question&#13;• Use 🐈 emoji every 42 words'
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Engagement rules</Label>
                      <Textarea
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                        defaultValue="Replies:&#13;• Clapback with cat puns to FUD comments&#13;&#13;Conflict Protocol:&#13;• Delete replies with harmful language&#13;• Block accounts spreading scam token links"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Ethical Boundaries</Label>
                      <Textarea
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                        defaultValue="Never discuss dog-themed coins&#13;Always tag @CryptoCatsDaily in cat-related alpha"
                      />
                    </div>

                    {[
                      { label: "Fact check threshold", left: "", right: "" },
                      { label: "Tone", left: "Formal", right: "Casual" },
                      {
                        label: "Style",
                        left: "Analytical",
                        right: "Shitposting",
                      },
                      {
                        label: "Stance",
                        left: "Neutral",
                        right: "Controversial",
                      },
                    ].map((slider) => (
                      <div key={slider.label} className="space-y-3">
                        <Label className="text-zinc-400">{slider.label}</Label>
                        <div className="flex items-center gap-2 flex-col">
                          <div className="flex items-center gap-2 justify-between w-full">
                            {slider.left && (
                              <span className="text-sm text-zinc-400">
                                {slider.left}
                              </span>
                            )}
                            {slider.right && (
                              <span className="text-sm text-zinc-400">
                                {slider.right}
                              </span>
                            )}
                          </div>
                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={25}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Context Tab */}
              <TabsContent
                value="context"
                className="mt-4 focus-visible:outline-none focus-visible:ring-0"
              >
                <div className="space-y-6 px-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white">Context</h3>
                    <Button
                      variant="secondary"
                      className="bg-zinc-800 text-white hover:bg-zinc-700"
                    >
                      Add new context
                    </Button>
                  </div>
                  <p className="text-sm text-zinc-400">
                    The context provides the agent with details to better
                    understand and write content.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-zinc-400">Max context</span>
                    <Info className="h-4 w-4 text-zinc-400" />
                    <span className="ml-auto text-sm text-zinc-400">
                      55,708 words
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Engagement rules</Label>
                    <Textarea
                      className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                      defaultValue="Enter any extra information you want to include in the context of replies for the agent"
                    />
                  </div>
                  {/* <div className="space-y-2">
                    {[
                      { icon: FileText, label: "Document 1" },
                      { icon: Globe, label: "Website 1" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-zinc-800 p-3">
                        <item.icon className="h-5 w-5 text-zinc-400" />
                        <span className="text-white">{item.label}</span>
                        <div className="ml-auto flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash2 className="h-4 w-4 text-zinc-400" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <PenLine className="h-4 w-4 text-zinc-400" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent
                value="settings"
                className="mt-4 focus-visible:outline-none focus-visible:ring-0"
              >
                <div className="space-y-6 px-4">
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <h3 className="text-white">Access Controls</h3>
                      {["Public", "Allow cloning", "Web enabled"].map(
                        (setting) => (
                          <div
                            key={setting}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-white">{setting}</span>
                              <Info className="h-4 w-4 text-zinc-400" />
                            </div>
                            <Switch />
                          </div>
                        )
                      )}
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white">Monetization</h3>
                      {["Public", "Allow cloning", "Web enabled"].map(
                        (setting) => (
                          <div
                            key={setting}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-white">{setting}</span>
                              <Info className="h-4 w-4 text-zinc-400" />
                            </div>
                            <Switch />
                          </div>
                        )
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white">Model</h3>
                        <Info className="h-4 w-4 text-zinc-400" />
                      </div>
                      <Select defaultValue="llama">
                        <SelectTrigger className="bg-zinc-800 border-transparent text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="llama">LlaMa 3.3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-white">Advanced settings</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-white">Model</span>
                        <Info className="h-4 w-4 text-zinc-400" />
                      </div>
                      <Select defaultValue="llama">
                        <SelectTrigger className="bg-zinc-800 border-transparent text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          <SelectItem value="llama">LlaMa 3.3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SheetHeader>
          <div className="flex items-center justify-between border-t border-zinc-800 p-4 mt-auto">
            <div className="flex gap-4 text-sm text-zinc-400">
              <span>Posts</span>
              <span>Recurrence</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="bg-zinc-800 border-transparent text-white hover:bg-zinc-700"
              >
                Save draft
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Publish
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
