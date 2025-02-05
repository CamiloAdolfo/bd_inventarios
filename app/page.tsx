import EscenariosClient from "../components/EscenariosClient"

export default function Home() {
  // Verificación temporal de variables de entorno
  console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Escenarios Deportivos</h1>
      <EscenariosClient />
    </main>
  )
}

