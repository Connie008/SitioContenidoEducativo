"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { File, MoreVertical, Download, Pencil, Trash2, Eye, Search } from "lucide-react"

// Datos de ejemplo para los PDFs
const initialPdfs = [
  {
    id: 1,
    title: "Guía de Matemáticas Avanzadas",
    description: "Material complementario para el curso de cálculo diferencial e integral.",
    category: "matematicas",
    size: "2.4 MB",
    uploadDate: "2023-11-15",
    downloads: 128,
  },
  {
    id: 2,
    title: "Introducción a la Programación en Python",
    description: "Manual básico para aprender los fundamentos de Python.",
    category: "programacion",
    size: "1.8 MB",
    uploadDate: "2023-10-22",
    downloads: 345,
  },
  {
    id: 3,
    title: "Historia del Arte Contemporáneo",
    description: "Compendio de las principales corrientes artísticas del siglo XX y XXI.",
    category: "historia",
    size: "5.2 MB",
    uploadDate: "2023-09-30",
    downloads: 87,
  },
  {
    id: 4,
    title: "Guía de Gramática Inglesa",
    description: "Reglas gramaticales y ejercicios prácticos para estudiantes de nivel intermedio.",
    category: "idiomas",
    size: "3.1 MB",
    uploadDate: "2023-11-05",
    downloads: 210,
  },
]

export function PdfList() {
  const [pdfs, setPdfs] = useState(initialPdfs)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPdfs = pdfs.filter(
    (pdf) =>
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, { label: string; color: string }> = {
      matematicas: { label: "Matemáticas", color: "bg-blue-100 text-blue-800" },
      programacion: { label: "Programación", color: "bg-purple-100 text-purple-800" },
      historia: { label: "Historia", color: "bg-amber-100 text-amber-800" },
      literatura: { label: "Literatura", color: "bg-emerald-100 text-emerald-800" },
      idiomas: { label: "Idiomas", color: "bg-pink-100 text-pink-800" },
      ciencias: { label: "Ciencias", color: "bg-cyan-100 text-cyan-800" },
      otros: { label: "Otros", color: "bg-gray-100 text-gray-800" },
    }

    return categories[category] || { label: "Otros", color: "bg-gray-100 text-gray-800" }
  }

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este documento?")) {
      setPdfs(pdfs.filter((pdf) => pdf.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar documentos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredPdfs.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead className="hidden md:table-cell">Categoría</TableHead>
                <TableHead className="hidden md:table-cell">Tamaño</TableHead>
                <TableHead className="hidden md:table-cell">Fecha</TableHead>
                <TableHead className="hidden md:table-cell">Descargas</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPdfs.map((pdf) => {
                const category = getCategoryLabel(pdf.category)

                return (
                  <TableRow key={pdf.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <File className="h-8 w-8 text-blue-500 shrink-0" />
                        <div>
                          <p className="font-medium">{pdf.title}</p>
                          <p className="text-xs text-gray-500 hidden sm:block">{pdf.description}</p>
                          <div className="md:hidden flex items-center mt-1">
                            <Badge variant="outline" className={`text-xs ${category.color}`}>
                              {category.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className={category.color}>
                        {category.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{pdf.size}</TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(pdf.uploadDate)}</TableCell>
                    <TableCell className="hidden md:table-cell">{pdf.downloads}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Ver
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Download className="h-4 w-4" /> Descargar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => handleDelete(pdf.id)}
                          >
                            <Trash2 className="h-4 w-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10 border rounded-md">
          <File className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No se encontraron documentos</p>
          {searchQuery && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Mostrar todos los documentos
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

