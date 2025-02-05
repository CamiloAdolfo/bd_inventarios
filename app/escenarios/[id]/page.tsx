import { Suspense } from "react"
import { supabase } from "@/lib/supabase"
import EscenarioDetalle from "./escenario-detalle"

async function getEscenario(id: string) {
  const { data: escenario, error: errorEscenario } = await supabase.from("escenarios").select("*").eq("id", id).single()

  if (errorEscenario) {
    console.error("Error fetching escenario:", errorEscenario)
    return null
  }

  return escenario
}

async function getItems(id: string) {
  const { data: items, error: errorItems } = await supabase.from("items").select("*").eq("escenario_id", id)

  if (errorItems) {
    console.error("Error fetching items:", errorItems)
    return []
  }

  return items || []
}

export default async function Page({ params }: { params: { id: string } }) {
  const [escenario, items] = await Promise.all([getEscenario(params.id), getItems(params.id)])

  if (!escenario) {
    return <div className="p-4 text-red-500">Escenario no encontrado</div>
  }

  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EscenarioDetalle escenario={escenario} initialItems={items} />
    </Suspense>
  )
}

