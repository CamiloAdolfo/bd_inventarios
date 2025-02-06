"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { EscenariosTable } from "./EscenariosTable"
import type { Escenario, Item } from "@/types/escenario"

export default function EscenariosClient() {
  const [escenarios, setEscenarios] = useState<Escenario[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      const [{ data: escenariosData, error: escenariosError }, { data: itemsData, error: itemsError }] =
        await Promise.all([supabase.from("escenarios").select("*"), supabase.from("items").select("*")])

      if (escenariosError) throw escenariosError
      if (itemsError) throw itemsError

      setEscenarios(escenariosData || [])
      setItems(itemsData || [])
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error desconocido")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return <EscenariosTable escenarios={escenarios} items={items} />
}

