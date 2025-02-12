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
import { X, Info } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { createAgent } from "@/actions/create-agent";
import { AgentFormData } from "@/lib/types";
export function CreateAgentDrawer() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<AgentFormData>({
    // General tab
    image: '',
    name: '',
    handle: '',
    description: '',
    category: '',
    tags: '',

    // Instructions tab
    engagementHooks: '• Always pair charts with cat memes\n• End threads with "GM or GN?" question\n• Use 🐈 emoji every 42 words',
    engagementRules: 'Replies:\n• Clapback with cat puns to FUD comments\n\nConflict Protocol:\n• Delete replies with harmful language\n• Block accounts spreading scam token links',
    ethicalBoundaries: 'Never discuss dog-themed coins\nAlways tag @CryptoCatsDaily in cat-related alpha',
    factCheckThreshold: 50,
    tone: 50,
    style: 50,
    stance: 50,

    // Context tab
    context: 'Enter any extra information you want to include in the context of replies for the agent',

    // Settings tab
    isPublic: false,
    model: 'Llama 3.3'
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    console.log(field, value);
    console.log(formData);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update the input handlers in General tab
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          handleInputChange('image', e.target.result as string);
          const img = document.getElementById("preview") as HTMLImageElement;
          const placeholder = document.getElementById("placeholder");
          if (img) {
            img.src = e.target.result as string;
            img.style.display = "block";
          }
          if (placeholder) placeholder.style.display = "none";
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="text-sline-text-dark-secondary hover:text-sline-text-dark-primary hover:bg-sline-alpha-dark-050 rounded-xl"
        >
          Create an agent
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[400px] border bg-sline-base-surface-1 p-0 rounded-xl border-sline-base-border-alpha"
      >
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-sline-base-border-alpha px-4 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-sline-text-dark-primary">
                Create agent
              </SheetTitle>
              <SheetClose className="rounded-full p-2 hover:bg-sline-alpha-dark-050">
                <X className="h-4 w-4 text-sline-text-dark-secondary" />
              </SheetClose>
            </div>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="w-full justify-start gap-6 h-auto p-0 rounded-none border-b border-sline-base-border-alpha">
                {["general", "instructions", "context", "settings"].map(
                  (tab) => (
                    <TabsTrigger
                      key={tab}
                      value={tab}
                      className="bg-transparent relative pb-4 text-sline-text-dark-secondary data-[state=active]:text-sline-text-dark-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none capitalize data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-sline-state-brand-active"
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
                  <div className="mx-auto w-32 h-32 bg-sline-alpha-dark-050 border border-border rounded-lg flex items-center justify-center relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
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
                          value={formData[field as keyof typeof formData] as string}
                          onChange={(e) => handleInputChange(field, e.target.value)}
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
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
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
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
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
                        value={formData.engagementHooks}
                        onChange={(e) => handleInputChange('engagementHooks', e.target.value)}
                        placeholder="Enter engagement hooks..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Engagement rules</Label>
                      <Textarea
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                        value={formData.engagementRules}
                        onChange={(e) => handleInputChange('engagementRules', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Ethical Boundaries</Label>
                      <Textarea
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600 min-h-[100px]"
                        value={formData.ethicalBoundaries}
                        onChange={(e) => handleInputChange('ethicalBoundaries', e.target.value)}
                      />
                    </div>

                    {[
                      { label: "Fact check threshold", left: "", right: "", key: "factCheckThreshold" },
                      { label: "Tone", left: "Formal", right: "Casual", key: "tone" },
                      {
                        label: "Style",
                        left: "Analytical",
                        right: "Shitposting",
                        key: "style"
                      },
                      {
                        label: "Stance",
                        left: "Neutral",
                        right: "Controversial",
                        key: "stance"
                      },
                    ].map((slider) => (
                      <div key={slider.label} className="space-y-1">
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
                            defaultValue={[formData.factCheckThreshold]}
                            max={100}
                            step={25}
                            className="flex-1"
                            value={[Number(formData[slider.key as keyof typeof formData])]}
                            onValueChange={(value) => handleInputChange(slider.key, value[0])}
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
                      value={formData.context}
                      onChange={(e) => handleInputChange('context', e.target.value)}
                    />
                  </div>
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
                      {["Public"].map((setting) => (
                        <div
                          key={setting}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-white">{setting}</span>
                            <Info className="h-4 w-4 text-zinc-400" />
                          </div>
                          <Switch
                            checked={formData.isPublic}
                            onCheckedChange={(value) => handleInputChange('isPublic', value)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white">Model</h3>
                        <Info className="h-4 w-4 text-zinc-400" />
                      </div>
                      <Select
                        value={formData.model}
                        onValueChange={(value) => handleInputChange('model', value)}
                      >
                        <SelectTrigger className="bg-zinc-800 border-transparent text-white">
                          <SelectValue placeholder="Select model" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700">
                          {["Llama 3.3", "GPT-4o"].map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SheetHeader>
          <div className="flex items-center justify-end border-t border-zinc-800 p-4 mt-auto">
            <div className="flex gap-2">
              {/* <Button
                variant="outline"
                className="bg-sline-alpha-dark-050 border-transparent rounded-xl text-sline-text-dark-secondary hover:bg-sline-alpha-dark-100"
                onClick={() => {
                  // Handle draft saving
                  console.log('Saving draft:', formData);
                }}
              >
                Save draft
              </Button> */}
              <Button 
                className="bg-sline-state-brand-active text-sline-text-light-primary rounded-xl hover:bg-sline-state-brand-active/90"
                onClick={() => {
                  // Handle form submission
                  createAgent(formData);
                  console.log('Publishing:', formData);
                }}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
