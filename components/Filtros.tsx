"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FiltrosProps {
  onFiltrar: (filtros: Record<string, string>) => void
  campos: string[]
}

export function Filtros({ onFiltrar, campos }: FiltrosProps) {
  const [filtros, setFiltros] = useState<Record<string, string>>({})

  const handleChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const handleFiltrar = () => {
    onFiltrar(filtros)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {campos.map((campo) => (
        <div key={campo}>
          <Label htmlFor={campo}>{campo}</Label>
          <Input
            id={campo}
            value={filtros[campo] || ""}
            onChange={(e) => handleChange(campo, e.target.value)}
            placeholder={`Filtrar por ${campo}`}
          />
        </div>
      ))}
      <Button onClick={handleFiltrar} className="mt-4">
        Filtrar
      </Button>
    </div>
  )
}

