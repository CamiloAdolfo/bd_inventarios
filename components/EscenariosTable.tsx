"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { SearchBar } from "./SearchBar"
import { ComboboxFilter } from "./ComboboxFilter"
import type { Escenario } from "@/types/escenario"

interface EscenariosTableProps {
  escenarios: Escenario[]
}

export function EscenariosTable({ escenarios }: EscenariosTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [sortConfig, setSortConfig] = useState<{ key: keyof Escenario; direction: "asc" | "desc" } | null>(null)

  // Columnas permitidas para filtrar
  const filterColumns = ["comuna", "barrio", "entidad_administra", "administrador"]

  const handleSort = (key: keyof Escenario) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }
    setSortConfig({ key, direction })
  }

  const filteredEscenarios = useMemo(() => {
    return escenarios.filter((escenario) => {
      const matchesSearch = Object.values(escenario).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase()),
      )

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value || value === "mostrar_todos") return true
        return String(escenario[key as keyof Escenario])
          .toLowerCase()
          .includes(value.toLowerCase())
      })

      return matchesSearch && matchesFilters
    })
  }, [escenarios, searchTerm, filters])

  const sortedEscenarios = useMemo(() => {
    if (!sortConfig) return filteredEscenarios

    return [...filteredEscenarios].sort((a, b) => {
      const { key, direction } = sortConfig
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1
      return 0
    })
  }, [filteredEscenarios, sortConfig])

  const uniqueValues = (key: keyof Escenario) => {
    return Array.from(new Set(escenarios.map((e) => e[key])))
  }

  const translateColumnName = (name: string) => {
    const translations: Record<string, string> = {
      nombre: "Nombre",
      comuna: "Comuna",
      direccion: "Dirección",
      barrio: "Barrio",
      entidad_administra: "Entidad Administra",
      administrador: "Administrador",
      celular: "Celular",
    }
    return translations[name] || name
  }

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {filterColumns.map((key) => (
          <ComboboxFilter
            key={key}
            options={uniqueValues(key as keyof Escenario)}
            placeholder={translateColumnName(key)}
            onSelect={(value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          />
        ))}
      </div>

      <Table>
        <TableHeader className="table-header">
          <TableRow>
            <TableCell className="font-medium text-white">#</TableCell>
            {["nombre", "comuna", "direccion", "barrio", "entidad_administra", "administrador", "celular"].map(
              (key) => (
                <TableCell key={key} className="font-medium text-white">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as keyof Escenario)}
                    className="flex items-center text-white hover:text-gray-200"
                  >
                    {translateColumnName(key)}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableCell>
              ),
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedEscenarios.map((escenario, index) => (
            <TableRow
              key={escenario.id}
              className="table-row-hover cursor-pointer"
              onClick={() => router.push(`/escenarios/${escenario.id}`)}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{escenario.nombre}</TableCell>
              <TableCell>{escenario.comuna}</TableCell>
              <TableCell>{escenario.direccion}</TableCell>
              <TableCell>{escenario.barrio}</TableCell>
              <TableCell>{escenario.entidad_administra}</TableCell>
              <TableCell>{escenario.administrador}</TableCell>
              <TableCell>{escenario.celular}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

