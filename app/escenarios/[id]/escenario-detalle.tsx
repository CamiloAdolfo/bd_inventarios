"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface Item {
  id: number
  nombre: string
  cantidad: number
  seccion: string
  estado: string
}

interface EscenarioDetalleProps {
  escenario: any
  initialItems: Item[]
}

export default function EscenarioDetalle({ escenario, initialItems }: EscenarioDetalleProps) {
  const router = useRouter()
  const [items] = useState<Item[]>(initialItems)

  const inmuebles = items.filter((item) => item.seccion === "Inmuebles")
  const muebles = items.filter((item) => item.seccion === "Muebles")

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">{escenario.nombre}</h1>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Volver
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Información del Escenario</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Nombre:</span>
              <span>{escenario.nombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Susceptible administracion:</span>
              <span>{escenario.susceptible_administracion}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Barrio:</span>
              <span>{escenario.barrio}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Entidad administra:</span>
              <span>{escenario.entidad_administra}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Celular:</span>
              <span>{escenario.celular}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold">Comuna:</span>
              <span>{escenario.comuna}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Direccion:</span>
              <span>{escenario.direccion}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Georeferenciacion:</span>
              <Button variant="outline" size="sm" onClick={() => window.open(escenario.georeferenciacion, "_blank")}>
                <MapPin className="h-4 w-4 mr-2" />
                Ver en mapa
              </Button>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Administrador:</span>
              <span>{escenario.administrador}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{escenario.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Inmuebles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {inmuebles.map((item, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-semibold mb-2">{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Estado: {item.estado}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Muebles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {muebles.map((item, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-semibold mb-2">{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Estado: {item.estado}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

