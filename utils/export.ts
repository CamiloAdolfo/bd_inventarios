import * as XLSX from "xlsx"
import { jsPDF } from "jspdf"
import "jspdf-autotable"
import type { Escenario, Item } from "@/types/escenario"

export function exportToExcel(escenarios: Escenario[], items: Item[]) {
  const data = escenarios.map((escenario) => {
    const escenarioItems = items.filter((item) => item.escenario_id === escenario.id)
    const muebles = escenarioItems.filter((item) => item.seccion === "Muebles")
    const inmuebles = escenarioItems.filter((item) => item.seccion === "Inmuebles")

    return {
      Nombre: escenario.nombre,
      Comuna: escenario.comuna,
      Dirección: escenario.direccion,
      Barrio: escenario.barrio,
      "Entidad Administra": escenario.entidad_administra,
      Administrador: escenario.administrador,
      Celular: escenario.celular,
      Email: escenario.email,
      Inmuebles: inmuebles.map((i) => `${i.nombre} (${i.cantidad})`).join(", "),
      Muebles: muebles.map((i) => `${i.nombre} (${i.cantidad})`).join(", "),
    }
  })

  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(wb, ws, "Escenarios")
  XLSX.writeFile(wb, "escenarios.xlsx")
}

export function exportToPDF(escenario: Escenario, items: Item[]) {
  const doc = new jsPDF()

  // Título
  doc.setFontSize(16)
  doc.text(escenario.nombre, 20, 20)

  // Información general
  doc.setFontSize(12)
  const info = [
    ["Comuna", escenario.comuna],
    ["Dirección", escenario.direccion],
    ["Barrio", escenario.barrio],
    ["Entidad Administra", escenario.entidad_administra],
    ["Administrador", escenario.administrador],
    ["Celular", escenario.celular],
    ["Email", escenario.email],
  ]

  doc.autoTable({
    startY: 30,
    head: [["Campo", "Valor"]],
    body: info,
  })

  // Inmuebles
  const inmuebles = items.filter((item) => item.seccion === "Inmuebles")
  if (inmuebles.length > 0) {
    doc.text("Inmuebles", 20, doc.lastAutoTable.finalY + 20)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [["Nombre", "Cantidad", "Estado"]],
      body: inmuebles.map((item) => [item.nombre, item.cantidad.toString(), item.estado]),
    })
  }

  // Muebles
  const muebles = items.filter((item) => item.seccion === "Muebles")
  if (muebles.length > 0) {
    doc.text("Muebles", 20, doc.lastAutoTable.finalY + 20)
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [["Nombre", "Cantidad", "Estado"]],
      body: muebles.map((item) => [item.nombre, item.cantidad.toString(), item.estado]),
    })
  }

  doc.save(`escenario-${escenario.id}.pdf`)
}

