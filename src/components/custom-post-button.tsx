"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle } from "lucide-react"

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const [includeImage, setIncludeImage] = useState(false)
  const [textPrompt, setTextPrompt] = useState("")
  const [imagePrompt, setImagePrompt] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ textPrompt, includeImage, imagePrompt })
    // Handle form submission logic here
    setIsOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-white hover:bg-gray-200 text-gray-900 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <PlusCircle className="size-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-prompt" className="text-sm font-medium text-gray-200">
                What is the post about?
              </Label>
              <Textarea
                id="text-prompt"
                placeholder="Enter your text prompt here..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-image"
                checked={includeImage}
                onCheckedChange={(checked) => setIncludeImage(checked as boolean)}
                className="border-white data-[state=checked]:bg-white data-[state=checked]:text-gray-900"
              />
              <Label
                htmlFor="include-image"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
              >
                Include an image?
              </Label>
            </div>
            {includeImage && (
              <div className="space-y-2">
                <Label htmlFor="image-prompt" className="text-sm font-medium text-gray-200">
                  Image Prompt
                </Label>
                <Textarea
                  id="image-prompt"
                  placeholder="Describe the image you want to generate..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
            )}
            <Button type="submit" className="w-full bg-white hover:bg-gray-200 text-gray-900">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

