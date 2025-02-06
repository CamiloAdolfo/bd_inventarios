export interface Item {
  id: number
  nombre: string
  cantidad: number
  seccion: string
  estado: string
  escenario_id: number
  tipo?: string
}

export interface Escenario {
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
  items?: Item[]
}

export interface FilterState {
  escenario: Record<string, string>
  items: string[]
}

