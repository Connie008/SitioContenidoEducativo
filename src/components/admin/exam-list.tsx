"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, MoreVertical, Pencil, Trash2, Eye, Search, BarChart } from "lucide-react"

// Datos de ejemplo para los exámenes
const initialExams = [
  {
    id: 1,
    title: "Examen de Matemáticas - Álgebra",
    description: "Evaluación de conocimientos sobre ecuaciones y funciones.",
    category: "matematicas",
    questions: 15,
    timeLimit: 45,
    createdAt: "2023-11-10",
    attempts: 78,
  },
  {
    id: 2,
    title: "Cuestionario de Programación en Python",
    description: "Test sobre fundamentos de Python y estructuras de datos.",
    category: "programacion",
    questions: 20,
    timeLimit: 60,
    createdAt: "2023-10-25",
    attempts: 124,
  },
  {
    id: 3,
    title: "Evaluación de Historia Contemporánea",
    description: "Preguntas sobre eventos históricos del siglo XX.",
    category: "historia",
    questions: 25,
    timeLimit: 90,
    createdAt: "2023-11-05",
    attempts: 45,
  },
  {
    id: 4,
    title: "Test de Gramática Inglesa",
    description: "Evaluación de conocimientos gramaticales de nivel intermedio.",
    category: "idiomas",
    questions: 30,
    timeLimit: 40,
    createdAt: "2023-11-15",
    attempts: 92,
  },
]

export function ExamList() {
  const [exams, setExams] = useState(initialExams)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase()),
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
    if (confirm("¿Estás seguro de que deseas eliminar este examen?")) {
      setExams(exams.filter((exam) => exam.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Buscar exámenes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredExams.length > 0 ? (
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Examen</TableHead>
                <TableHead className="hidden md:table-cell">Categoría</TableHead>
                <TableHead className="hidden md:table-cell">Preguntas</TableHead>
                <TableHead className="hidden md:table-cell">Tiempo</TableHead>
                <TableHead className="hidden md:table-cell">Intentos</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => {
                const category = getCategoryLabel(exam.category)

                return (
                  <TableRow key={exam.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ClipboardList className="h-8 w-8 text-indigo-500 shrink-0" />
                        <div>
                          <p className="font-medium">{exam.title}</p>
                          <p className="text-xs text-gray-500 hidden sm:block">{exam.description}</p>
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
                    <TableCell className="hidden md:table-cell">{exam.questions}</TableCell>
                    <TableCell className="hidden md:table-cell">{exam.timeLimit} min</TableCell>
                    <TableCell className="hidden md:table-cell">{exam.attempts}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Eye className="h-4 w-4" /> Vista previa
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" /> Ver estadísticas
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex items-center gap-2 text-red-600"
                            onClick={() => handleDelete(exam.id)}
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
          <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No se encontraron exámenes</p>
          {searchQuery && (
            <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
              Mostrar todos los exámenes
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

