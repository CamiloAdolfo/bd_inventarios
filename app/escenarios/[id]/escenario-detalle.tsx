"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MapPin, FileText, FileIcon as FileWord } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { Escenario, Item } from "@/types/escenario"
import { exportToPDF } from "@/utils/export"
import { generateActa } from "@/utils/generateDoc"
import type { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    return {
        title: `Escenario ${params.id}`
    }
}

export default function EscenarioDetalle({ params }: PageProps) {
  const router = useRouter()
  const id = params.id;
  const [items, setItems] = useState<Item[]>([]); // Initialize items, and add setter
  
  // Fetch data inside the component
  useState(() => {
    async function fetchData() {
        try {
            const res = await fetch(`/api/escenarios/${id}`); // Replace with your actual API endpoint
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setItems(data.items); // Assuming the API returns an object with an 'items' property
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error, maybe set an error state
        }
    }
    fetchData();
  }, [id]);

  const inmuebles = items.filter((item) => item.seccion === "Inmuebles")
  const muebles = items.filter((item) => item.seccion === "Muebles")

  const getEstadoColor = (estado: string): string => {
    switch (estado.toLowerCase()) {
      case "bueno":
        return "text-green-600"
      case "regular":
        return "text-yellow-600"
      case "malo":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const handleExportPDF = (): void => {
    exportToPDF({nombre: "nombre"}, items) // Pass dummy data for escenario
  }

  const handleGenerateActa = (): void => {
    generateActa({nombre: "nombre"}, items) // Pass dummy data for escenario
  }

  return (
    <div className="container mx-auto px-4 py-6 lg:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Escenario {id}</h1> {/* Display the ID */}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.push("/")} className="btn-black">
            Volver
          </Button>
          <Button variant="secondary" onClick={handleExportPDF} className="btn-black">
            <FileText className="h-4 w-4 text-red-500" />
          </Button>
          <Button variant="secondary" onClick={handleGenerateActa} className="btn-black">
            <FileWord className="h-4 w-4 text-blue-500" />
          </Button>
        </div>
      </div>

      {/* ... rest of your JSX, using inmuebles and muebles ... */}
            <div className="grid grid-cols-[auto,1fr] gap-2">
                <span className="font-semibold">Correo electrónico:</span> <span>{/*escenario["correo electrónico"]*/}</span>
              </div>
      {/* ... */}
    </div>
  )
}