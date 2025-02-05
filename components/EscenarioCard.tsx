import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface Inmueble {
  nombre: string
  cantidad: number
  estado: string
}

interface Escenario {
  id: number
  nombre: string
  susceptible_administracion: string
  comuna: string
  direccion: string
  barrio: string
  georeferenciacion: string
  entidad_administra: string
  administrador: string
  celular: string
  email: string
  inmuebles: Inmueble[]
  muebles: Inmueble[]
}

interface EscenarioCardProps {
  escenario: Escenario
  onClose: () => void
}

export function EscenarioCard({ escenario, onClose }: EscenarioCardProps) {
  const handleMapClick = () => {
    if (escenario.georeferenciacion) {
      window.open(escenario.georeferenciacion, "_blank")
    }
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{escenario.nombre}</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Volver
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Información del Escenario</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Nombre:</span>
                  <span>{escenario.nombre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Susceptible administración:</span>
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
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Comuna:</span>
                  <span>{escenario.comuna}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Dirección:</span>
                  <span>{escenario.direccion}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Georeferenciación:</span>
                  <Button variant="outline" size="sm" onClick={handleMapClick}>
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

          {escenario.inmuebles && escenario.inmuebles.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Inmuebles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {escenario.inmuebles.map((inmueble, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{inmueble.nombre}</h3>
                    <p>Cantidad: {inmueble.cantidad}</p>
                    <p>Estado: {inmueble.estado}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {escenario.muebles && escenario.muebles.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Muebles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {escenario.muebles.map((mueble, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{mueble.nombre}</h3>
                    <p>Cantidad: {mueble.cantidad}</p>
                    <p>Estado: {mueble.estado}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

