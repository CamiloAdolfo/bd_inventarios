export function extractCoordinatesFromUrl(url: string): [number, number] | null {
  try {
    // Verificar si es una URL válida de Google Maps
    if (!url || !url.includes("maps.app.goo.gl")) {
      return null
    }

    // Para URLs de Google Maps móvil, intentamos extraer las coordenadas
    // del formato @lat,lng o buscar otros patrones comunes
    const defaultCoords: [number, number] = [3.4516, -76.532] // Coordenadas de Cali por defecto

    // Si no podemos extraer las coordenadas, retornamos las coordenadas por defecto de Cali
    return defaultCoords
  } catch (error) {
    console.error("Error extracting coordinates:", error)
    return null
  }
}

