"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import type { Escenario } from "@/types/escenario"

interface MapViewProps {
  escenarios: Escenario[]
}

export function MapView({ escenarios }: MapViewProps) {
  // Filtrar escenarios con coordenadas válidas y convertir a [lat, lng]
  const locations = escenarios
    .map((escenario) => {
      const coords = escenario.georeferenciacion.split("@")[1]?.split(",").slice(0, 2).map(Number).reverse()

      return coords && coords.length === 2 && !coords.some(isNaN)
        ? {
            ...escenario,
            coords,
          }
        : null
    })
    .filter(Boolean)

  if (locations.length === 0) {
    return <div>No hay ubicaciones disponibles para mostrar</div>
  }

  // Calcular el centro del mapa basado en la primera ubicación
  const center = locations[0]?.coords || [3.4516, -76.532] // Coordenadas de Cali por defecto

  return (
    <MapContainer center={center} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker key={location.id} position={location.coords}>
          <Popup>
            <div>
              <h3 className="font-semibold">{location.nombre}</h3>
              <p>{location.direccion}</p>
              <p>Comuna: {location.comuna}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

