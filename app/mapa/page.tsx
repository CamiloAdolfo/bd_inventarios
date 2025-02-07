"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { MapView } from "@/components/MapView"
import type { Escenario } from "@/types/escenario"

export default function MapaPage() {
  const [escenarios, setEscenarios] = useState<Escenario[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEscenarios() {
      const { data, error } = await supabase.from("escenarios").select("*")

      if (error) {
        console.error("Error cargando escenarios:", error)
        return
      }

      setEscenarios(data || [])
      setLoading(false)
    }

    fetchEscenarios()
  }, [])

  if (loading) return <div>Cargando...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mapa de Escenarios</h1>
      <MapView escenarios={escenarios} />
    </div>
  )
}

