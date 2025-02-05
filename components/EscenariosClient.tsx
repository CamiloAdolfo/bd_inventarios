"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { EscenariosTable } from "./EscenariosTable"

export default function EscenariosClient() {
  const [escenarios, setEscenarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEscenarios()
  }, [])

  async function fetchEscenarios() {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("escenarios").select("*")

      if (error) throw error

      setEscenarios(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error}</div>

  return <EscenariosTable escenarios={escenarios} />
}

