import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ClipboardList, Clock, HelpCircle } from "lucide-react"

interface Exam {
  id: number
  title: string
  description: string
  category: string
  questions: number
  timeLimit: number
  difficulty: string
  image: string
}

interface ExamCardProps {
  exam: Exam
}

export function ExamCard({ exam }: ExamCardProps) {
  const getCategoryInfo = (category: string) => {
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

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      Básico: "bg-green-100 text-green-800",
      Intermedio: "bg-yellow-100 text-yellow-800",
      Avanzado: "bg-red-100 text-red-800",
    }

    return colors[difficulty] || "bg-gray-100 text-gray-800"
  }

  const category = getCategoryInfo(exam.category)
  const difficultyColor = getDifficultyColor(exam.difficulty)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48">
        <Image src={exam.image || "/placeholder.svg"} alt={exam.title} fill className="object-cover" />
        <div className="absolute top-3 left-3">
          <Badge className={category.color}>{category.label}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge className={difficultyColor}>{exam.difficulty}</Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{exam.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exam.description}</p>

        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <div className="flex items-center">
            <HelpCircle className="h-4 w-4 mr-1" />
            <span>{exam.questions} preguntas</span>
          </div>

          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{exam.timeLimit} minutos</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link href={`/examenes/${exam.id}`} className="w-full">
          <Button className="w-full" variant="default">
            <ClipboardList className="h-4 w-4 mr-2" />
            Iniciar examen
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

