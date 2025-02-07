import Docxtemplater from "docxtemplater"
import PizZip from "pizzip"
import { saveAs } from "file-saver"
import type { Escenario, Item } from "@/types/escenario"

export async function generateActa(escenario: Escenario, items: Item[]) {
  try {
    // Cargar la plantilla
    const response = await fetch("/plantilla_acta_inventario.docx")
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const zip = new PizZip(arrayBuffer)

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    })

    // Preparar los datos
    const muebles = items
      .filter((item) => item.seccion === "Muebles")
      .map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        estado: item.estado,
      }))

    const inmuebles = items
      .filter((item) => item.seccion === "Inmuebles")
      .map((item) => ({
        nombre: item.nombre,
        cantidad: item.cantidad,
        estado: item.estado,
      }))

    // Renderizar el documento
    doc.render({
      nombre_escenario: escenario.nombre,
      direccion: escenario.direccion,
      comuna: escenario.comuna,
      barrio: escenario.barrio,
      administrador: escenario.administrador,
      celular: escenario.celular,
      email: escenario.email,
      muebles,
      inmuebles,
    })

    // Generar y descargar el archivo
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })

    saveAs(out, `acta_inventario_${escenario.nombre}.docx`)
  } catch (error) {
    console.error("Error generando el acta:", error)
  }
}

