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
        <DialogContent className="sm:max-w-[425px] bg-sline-base-surface-1 text-sline-text-dark-primary border-sline-base-border-alpha">
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-prompt" className="text-sm font-medium text-sline-text-dark-secondary">
                What is the post about?
              </Label>
              <Textarea
                id="text-prompt"
                placeholder="Enter your text prompt here..."
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                className="w-full bg-sline-base-surface-2 border-sline-base-border text-sline-text-dark-primary placeholder:text-sline-text-dark-secondary"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-image"
                checked={includeImage}
                onCheckedChange={(checked) => setIncludeImage(checked as boolean)}
                className="border-sline-base-border data-[state=checked]:bg-sline-base-surface-2 data-[state=checked]:text-sline-text-dark-primary"
              />
              <Label
                htmlFor="include-image"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sline-text-dark-secondary"
              >
                Include an image?
              </Label>
            </div>
            {includeImage && (
              <div className="space-y-2">
                <Label htmlFor="image-prompt" className="text-sm font-medium text-sline-text-dark-secondary">
                  Image Prompt
                </Label>
                <Textarea
                  id="image-prompt"
                  placeholder="Describe the image you want to generate..."
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full bg-sline-base-surface-2 border-sline-base-border text-sline-text-dark-primary placeholder:text-sline-text-dark-secondary"
                />
              </div>
            )}
            <Button type="submit" className="w-full text-sline-text-dark-primary">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

