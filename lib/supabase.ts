import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Faltan las variables de entorno de Supabase")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getEscenarioWithItems(id: number) {
  // Obtener el escenario
  const { data: escenario, error: escenarioError } = await supabase.from("escenarios").select("*").eq("id", id).single()

  if (escenarioError) throw escenarioError

  // Obtener los items relacionados
  const { data: items, error: itemsError } = await supabase.from("items").select("*").eq("escenario_id", id)

  if (itemsError) throw itemsError

  // Separar items en muebles e inmuebles
  const muebles = items.filter((item) => item.tipo === "mueble")
  const inmuebles = items.filter((item) => item.tipo === "inmueble")

  return {
    ...escenario,
    muebles,
    inmuebles,
  }
}

