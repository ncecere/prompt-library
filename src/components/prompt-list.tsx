"use client"

import { useState } from "react"
import Link from "next/link"
import PromptCard from "./prompt-card"
import SearchBar from "./search-bar"
import { Prompt } from "@/lib/types"

export default function PromptList({ initialPrompts }: { initialPrompts: Prompt[] }) {
  const [filteredPrompts, setFilteredPrompts] = useState(initialPrompts)

  const handleSearch = (term: string) => {
    const filtered = initialPrompts.filter(
      (prompt) =>
        prompt.name.toLowerCase().includes(term.toLowerCase()) ||
        prompt.description.toLowerCase().includes(term.toLowerCase()) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(term.toLowerCase())),
    )
    setFilteredPrompts(filtered)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Link key={prompt.id} href={`/prompt/${prompt.id}`}>
            <PromptCard prompt={prompt} />
          </Link>
        ))}
      </div>
    </>
  )
}
