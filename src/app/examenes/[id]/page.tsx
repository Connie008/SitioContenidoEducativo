"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react"

// Datos de ejemplo para los exámenes
const examsData = [
  {
    id: 1,
    title: "Examen de Matemáticas - Álgebra",
    description: "Evaluación de conocimientos sobre ecuaciones y funciones.",
    category: "matematicas",
    timeLimit: 45,
    questions: [
      {
        id: 1,
        type: "single",
        text: "¿Cuál es la solución de la ecuación 2x + 5 = 15?",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 5.5"],
        correctAnswers: [0],
      },
      {
        id: 2,
        type: "single",
        text: "¿Qué es un polinomio de segundo grado?",
        options: [
          "Una expresión con una variable elevada a la potencia 2",
          "Una expresión con dos variables",
          "Una ecuación con dos soluciones",
          "Una función con dos puntos de inflexión",
        ],
        correctAnswers: [0],
      },
      {
        id: 3,
        type: "multiple",
        text: "Selecciona las propiedades que cumplen las funciones lineales:",
        options: [
          "Su gráfica es una recta",
          "Tienen la forma f(x) = mx + b",
          "Siempre pasan por el origen",
          "Su derivada es constante",
        ],
        correctAnswers: [0, 1, 3],
      },
/*       {
        id: 4,
        type: "text",
        text: "Escribe la fórmula para calcular las raíces de una ecuación cuadrática (fórmula general).",
        correctAnswers: [],
      }, */
    ],
  },
  // Otros exámenes...
]

export default function ExamPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const examId = Number.parseInt(params.id)
  const exam = examsData.find((e) => e.id === examId)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<(number[] | string)[]>([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [examCompleted, setExamCompleted] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (!exam) {
      router.push("/examenes")
      return
    }

    // Inicializar respuestas
    setAnswers(new Array(exam.questions.length).fill([]))

    // Configurar temporizador
    setTimeLeft(exam.timeLimit * 60)

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          finishExam()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [exam, router])

  if (!exam) {
    return null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleSingleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = [optionIndex]
    setAnswers(newAnswers)
  }

  const handleMultipleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers]
    const currentAnswer = newAnswers[currentQuestion] as number[]

    if (Array.isArray(currentAnswer)) {
      const index = currentAnswer.indexOf(optionIndex)
      if (index === -1) {
        newAnswers[currentQuestion] = [...currentAnswer, optionIndex]
      } else {
        newAnswers[currentQuestion] = currentAnswer.filter((i) => i !== optionIndex)
      }
    } else {
      newAnswers[currentQuestion] = [optionIndex]
    }

    setAnswers(newAnswers)
  }

  const handleTextAnswer = (text: string) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = text
    setAnswers(newAnswers)
  }

  const nextQuestion = () => {
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const finishExam = () => {
    // Calcular puntuación
    let correctCount = 0

    exam.questions.forEach((question, index) => {
      const userAnswer = answers[index]

      if (question.type === "single" || question.type === "multiple") {
        if (
          Array.isArray(userAnswer) &&
          question.correctAnswers.length === userAnswer.length &&
          question.correctAnswers.every((a) => userAnswer.includes(a))
        ) {
          correctCount++
        }
      } else if (question.type === "text") {
        // Para preguntas de texto, se podría implementar una lógica más compleja
        // Por ahora, simplemente verificamos si hay una respuesta
        if (userAnswer && typeof userAnswer === "string" && userAnswer.trim() !== "") {
          correctCount++
        }
      }
    })

    const finalScore = Math.round((correctCount / exam.questions.length) * 100)
    setScore(finalScore)
    setExamCompleted(true)
  }

  const question = exam.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / exam.questions.length) * 100
  const currentAnswer = answers[currentQuestion]

  if (examCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">Examen Completado</h1>
                <p className="text-gray-600">Has finalizado el examen "{exam.title}"</p>
              </div>

              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center">
                  <span className="text-3xl font-bold">{score}%</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span>Preguntas totales:</span>
                  <span className="font-medium">{exam.questions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tiempo utilizado:</span>
                  <span className="font-medium">{exam.timeLimit - Math.floor(timeLeft / 60)} minutos</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Resultado:</span>
                  <span className={`font-medium ${score >= 70 ? "text-green-600" : "text-red-600"}`}>
                    {score >= 70 ? "Aprobado" : "No aprobado"}
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link href="/examenes" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a exámenes
                  </Button>
                </Link>
                <Button className="flex-1">Ver respuestas correctas</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/examenes">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{exam.title}</h1>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className={`font-medium ${timeLeft < 300 ? "text-red-600" : ""}`}>{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>
              Pregunta {currentQuestion + 1} de {exam.questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-6">{question.text}</h2>

            {question.type === "single" && (
              <RadioGroup
                value={
                  Array.isArray(currentAnswer) && currentAnswer.length > 0 ? currentAnswer[0].toString() : undefined
                }
                className="space-y-3"
              >
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      onClick={() => handleSingleAnswer(index)}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {question.type === "multiple" && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={Array.isArray(currentAnswer) && currentAnswer.includes(index)}
                      onCheckedChange={() => handleMultipleAnswer(index)}
                    />
                    <label
                      htmlFor={`option-${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </label>
                  </div>
                ))}

                <div className="pt-2 text-xs text-gray-500 flex items-center">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Selecciona todas las opciones correctas
                </div>
              </div>
            )}

            {question.type === "text" && (
              <div className="space-y-3">
                <Input
                  placeholder="Escribe tu respuesta aquí..."
                  value={typeof currentAnswer === "string" ? currentAnswer : ""}
                  onChange={(e) => handleTextAnswer(e.target.value)}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
            Anterior
          </Button>

          {currentQuestion < exam.questions.length - 1 ? (
            <Button onClick={nextQuestion}>Siguiente</Button>
          ) : (
            <Button onClick={finishExam}>Finalizar examen</Button>
          )}
        </div>
      </div>
    </div>
  )
}
