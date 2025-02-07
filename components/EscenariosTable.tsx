"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, FileSpreadsheet, MapIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { SearchBar } from "./SearchBar"
import { ComboboxFilter } from "./ComboboxFilter"
import type { Escenario, Item, FilterState } from "@/types/escenario"
import { exportToExcel } from "@/utils/export"

interface EscenariosTableProps {
  escenarios: Escenario[]
  items: Item[]
}

export function EscenariosTable({ escenarios, items }: EscenariosTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    escenario: {},
    items: [],
  })
  const [sortConfig, setSortConfig] = useState<{ key: keyof Escenario; direction: "asc" | "desc" } | null>(null)

  const filterColumns = ["comuna", "barrio", "entidad_administra", "administrador"]

  const uniqueItemNames = useMemo(() => {
    return Array.from(new Set(items.map((item) => item.nombre)))
  }, [items])

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

      const matchesEscenarioFilters = Object.entries(filters.escenario).every(([key, value]) => {
        if (!value) return true
        const escenarioValue = String(escenario[key as keyof Escenario]).toLowerCase()
        return escenarioValue.includes(String(value).toLowerCase())
      })

      const escenarioItems = items.filter((item) => item.escenario_id === escenario.id)
      const matchesItemFilters =
        filters.items.length === 0 ||
        filters.items.some((filterItem) =>
          escenarioItems.some((item) => item.nombre.toLowerCase() === filterItem.toLowerCase()),
        )

      return matchesSearch && matchesEscenarioFilters && matchesItemFilters
    })
  }, [escenarios, items, searchTerm, filters])

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
    return Array.from(new Set(escenarios.map((e) => String(e[key]))))
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

  const handleExportExcel = () => {
    exportToExcel(sortedEscenarios, items)
  }

  return (
    <div className="space-y-4">
      <SearchBar onSearch={setSearchTerm} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {filterColumns.map((key) => (
          <ComboboxFilter
            key={key}
            options={uniqueValues(key as keyof Escenario)}
            placeholder={translateColumnName(key)}
            onSelect={(value) =>
              setFilters((prev) => ({
                ...prev,
                escenario: { ...prev.escenario, [key]: value ? [value] : [] },
              }))
            }
            selectedItems={filters.escenario[key] || []}
          />
        ))}
        <ComboboxFilter
          options={uniqueItemNames}
          placeholder="Filtro por equipamientos"
          onSelect={(value) => {
            setFilters((prev) => ({
              ...prev,
              items: prev.items.includes(value) ? prev.items.filter((item) => item !== value) : [...prev.items, value],
            }))
          }}
          isMulti
          selectedItems={filters.items}
        />
      </div>

      <div className="flex justify-end gap-2 mb-4">
        <Button onClick={handleExportExcel} className="btn-black">
          <FileSpreadsheet className="h-4 w-4 text-green-500" />
        </Button>
        <Button onClick={() => router.push("/mapa")} className="btn-black">
          <MapIcon className="h-4 w-4 text-green-500" />
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="header-cell">#</TableCell>
            {["nombre", "comuna", "direccion", "barrio", "entidad_administra", "administrador", "celular"].map(
              (key) => (
                <TableCell key={key} className="header-cell">
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
              className="table-row-hover"
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

