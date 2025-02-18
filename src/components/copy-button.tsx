"use client"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  content: string
}

export function CopyButton({ content }: CopyButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute top-2 right-2"
      onClick={() => {
        navigator.clipboard.writeText(content)
      }}
    >
      Copy
    </Button>
  )
}
