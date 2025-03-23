import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ExamCard } from "@/components/exams/exam-card"

// Datos de ejemplo para los exámenes
const examsData = [
  {
    id: 1,
    title: "Examen de Matemáticas - Álgebra",
    description: "Evaluación de conocimientos sobre ecuaciones y funciones.",
    category: "matematicas",
    questions: 15,
    timeLimit: 45,
    difficulty: "Intermedio",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 2,
    title: "Cuestionario de Programación en Python",
    description: "Test sobre fundamentos de Python y estructuras de datos.",
    category: "programacion",
    questions: 20,
    timeLimit: 60,
    difficulty: "Avanzado",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 3,
    title: "Evaluación de Historia Contemporánea",
    description: "Preguntas sobre eventos históricos del siglo XX.",
    category: "historia",
    questions: 25,
    timeLimit: 90,
    difficulty: "Intermedio",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 4,
    title: "Test de Gramática Inglesa",
    description: "Evaluación de conocimientos gramaticales de nivel intermedio.",
    category: "idiomas",
    questions: 30,
    timeLimit: 40,
    difficulty: "Básico",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 5,
    title: "Cuestionario de Física - Mecánica",
    description: "Evaluación sobre leyes de Newton y mecánica clásica.",
    category: "ciencias",
    questions: 18,
    timeLimit: 50,
    difficulty: "Avanzado",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 6,
    title: "Evaluación de Literatura Española",
    description: "Preguntas sobre autores y obras clásicas de la literatura española.",
    category: "literatura",
    questions: 22,
    timeLimit: 60,
    difficulty: "Intermedio",
    image: "/placeholder.svg?height=200&width=350",
  },
]

export default function ExamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Exámenes y Cuestionarios</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline">Panel de Administración</Button>
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600 max-w-3xl">
            Pon a prueba tus conocimientos con nuestra colección de exámenes y cuestionarios. Selecciona cualquiera de
            ellos para comenzar y recibir una evaluación inmediata de tus resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examsData.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </div>
  )
}
