"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  onSearch: (term: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="search-container">
      <div className="relative search-bar">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar escenarios..." className="pl-8" onChange={(e) => onSearch(e.target.value)} />
      </div>
    </div>
  )
}

