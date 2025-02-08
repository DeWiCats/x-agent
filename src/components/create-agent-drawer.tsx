"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X } from "lucide-react"
import { useState } from "react"

export function CreateAgentDrawer() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-white text-black hover:bg-zinc-200">
          Create an agent
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] border-l border-zinc-800 bg-zinc-900 p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b border-zinc-800 px-4 py-4">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold text-white">Create agent</SheetTitle>
              <SheetClose className="rounded-full p-2 hover:bg-zinc-800">
                <X className="h-4 w-4 text-zinc-400" />
              </SheetClose>
            </div>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start gap-6 h-auto pb-3">
                <TabsTrigger
                  value="general"
                  className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="instructions"
                  className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Instructions
                </TabsTrigger>
                <TabsTrigger
                  value="context"
                  className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Context
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="bg-transparent text-zinc-400 data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-white"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                <div className="space-y-6 px-4">
                  <div className="mx-auto w-32 h-32 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <svg
                      className=" text-zinc-600"
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
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-zinc-400">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Text"
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="handle" className="text-zinc-400">
                        Handle
                      </Label>
                      <Input
                        id="handle"
                        placeholder="Text"
                        className="bg-zinc-800 border-transparent text-white placeholder:text-zinc-600"
                      />
                    </div>
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
            </Tabs>
          </SheetHeader>
          <div className="flex items-center justify-between border-t border-zinc-800 p-4 mt-auto">
            <div className="flex gap-4 text-sm text-zinc-400">
              <span>Posts</span>
              <span>Recurrence</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-zinc-800 border-transparent text-white hover:bg-zinc-700">
                Save draft
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">Publish</Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

