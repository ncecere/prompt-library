"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (term: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search prompts..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 py-6 text-lg w-full"
      />
    </div>
  )
}
