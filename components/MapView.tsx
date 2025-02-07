"use client"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import type { Escenario } from "@/types/escenario"
import { extractCoordinatesFromUrl } from "@/utils/coordinates"

interface MapViewProps {
  escenarios: Escenario[]
}

export function MapView({ escenarios }: MapViewProps) {
  // Coordenadas de Cali como centro por defecto
  const defaultCenter: [number, number] = [3.4516, -76.532]

  // Filtrar escenarios con coordenadas válidas
  const locations = escenarios
    .map((escenario) => {
      const coords = extractCoordinatesFromUrl(escenario.georeferenciacion)
      return coords
        ? {
            ...escenario,
            coords,
          }
        : null
    })
    .filter((location): location is Escenario & { coords: [number, number] } => location !== null)

  if (locations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-lg text-gray-600 mb-4">No hay ubicaciones disponibles para mostrar en el mapa.</p>
        <p className="text-sm text-gray-500">
          Asegúrate de que los escenarios tengan coordenadas válidas en la base de datos.
        </p>
      </div>
    )
  }

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden border">
      <MapContainer center={defaultCenter} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.coords}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold mb-1">{location.nombre}</h3>
                <p className="text-sm text-gray-600">{location.direccion}</p>
                <p className="text-sm text-gray-600">Comuna: {location.comuna}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

