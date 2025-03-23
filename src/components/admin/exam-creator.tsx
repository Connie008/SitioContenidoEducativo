"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Trash2, GripVertical, Save } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type QuestionType = "multiple" | "single" | "text"

interface Question {
  id: number
  type: QuestionType
  text: string
  options: string[]
  correctAnswers: number[]
}

export function ExamCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [timeLimit, setTimeLimit] = useState("30")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: 1,
    type: "single",
    text: "",
    options: ["", ""],
    correctAnswers: [],
  })

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, ""],
    })
  }

  const removeOption = (index: number) => {
    const newOptions = [...currentQuestion.options]
    newOptions.splice(index, 1)

    // Actualizar respuestas correctas si es necesario
    const newCorrectAnswers = currentQuestion.correctAnswers
      .filter((answerIndex) => answerIndex !== index)
      .map((answerIndex) => (answerIndex > index ? answerIndex - 1 : answerIndex))

    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
      correctAnswers: newCorrectAnswers,
    })
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options]
    newOptions[index] = value
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    })
  }

  const toggleCorrectAnswer = (index: number) => {
    const currentCorrectAnswers = [...currentQuestion.correctAnswers]

    if (currentQuestion.type === "single") {
      // Para preguntas de respuesta única, reemplazar la respuesta correcta
      setCurrentQuestion({
        ...currentQuestion,
        correctAnswers: [index],
      })
    } else {
      // Para preguntas de respuesta múltiple, alternar la selección
      const answerIndex = currentCorrectAnswers.indexOf(index)
      if (answerIndex === -1) {
        currentCorrectAnswers.push(index)
      } else {
        currentCorrectAnswers.splice(answerIndex, 1)
      }
      setCurrentQuestion({
        ...currentQuestion,
        correctAnswers: currentCorrectAnswers,
      })
    }
  }

  const addQuestion = () => {
    if (!currentQuestion.text.trim()) {
      alert("Por favor, ingresa el texto de la pregunta.")
      return
    }

    if (
      (currentQuestion.type === "single" || currentQuestion.type === "multiple") &&
      currentQuestion.correctAnswers.length === 0
    ) {
      alert("Por favor, selecciona al menos una respuesta correcta.")
      return
    }

    setQuestions([...questions, currentQuestion])

    // Preparar la siguiente pregunta
    setCurrentQuestion({
      id: currentQuestion.id + 1,
      type: "single",
      text: "",
      options: ["", ""],
      correctAnswers: [],
    })
  }

  const removeQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !category || questions.length === 0) {
      alert("Por favor, completa todos los campos requeridos y añade al menos una pregunta.")
      return
    }

    // En una aplicación real, aquí se enviaría el examen al servidor
    console.log("Examen creado:", {
      title,
      description,
      category,
      timeLimit,
      questions,
    })

    alert("Examen creado correctamente")

    // Resetear el formulario
    setTitle("")
    setDescription("")
    setCategory("")
    setTimeLimit("30")
    setQuestions([])
    setCurrentQuestion({
      id: 1,
      type: "single",
      text: "",
      options: ["", ""],
      correctAnswers: [],
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div>
          <Label htmlFor="title">Título del examen *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Examen de Matemáticas - Unidad 1"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Instrucciones o descripción del examen..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="category">Categoría *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematicas">Matemáticas</SelectItem>
                <SelectItem value="ciencias">Ciencias</SelectItem>
                <SelectItem value="historia">Historia</SelectItem>
                <SelectItem value="literatura">Literatura</SelectItem>
                <SelectItem value="programacion">Programación</SelectItem>
                <SelectItem value="idiomas">Idiomas</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeLimit">Tiempo límite (minutos)</Label>
            <Input
              id="timeLimit"
              type="number"
              min="1"
              max="180"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Preguntas añadidas ({questions.length})</h3>

        {questions.length > 0 ? (
          <div className="space-y-3 mb-4 max-h-40 overflow-y-auto pr-2">
            {questions.map((q, index) => (
              <div key={q.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border">
                <div className="flex items-center">
                  <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium">
                      {index + 1}. {q.text}
                    </p>
                    <p className="text-xs text-gray-500">
                      {q.type === "single"
                        ? "Respuesta única"
                        : q.type === "multiple"
                          ? "Respuesta múltiple"
                          : "Respuesta de texto"}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuestion(q.id)}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mb-4">No hay preguntas añadidas aún.</p>
        )}

        <Card>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="questionType">Tipo de pregunta</Label>
                <Select
                  value={currentQuestion.type}
                  onValueChange={(value: QuestionType) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      type: value,
                      correctAnswers: [],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Respuesta única</SelectItem>
                    <SelectItem value="multiple">Respuesta múltiple</SelectItem>
                    <SelectItem value="text">Respuesta de texto</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="questionText">Texto de la pregunta</Label>
                <Textarea
                  id="questionText"
                  value={currentQuestion.text}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      text: e.target.value,
                    })
                  }
                  placeholder="Escribe la pregunta aquí..."
                  rows={2}
                />
              </div>

              {(currentQuestion.type === "single" || currentQuestion.type === "multiple") && (
                <div className="space-y-2">
                  <Label>Opciones de respuesta</Label>

                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {currentQuestion.type === "single" ? (
                        <RadioGroup value={currentQuestion.correctAnswers[0]?.toString()}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value={index.toString()}
                              id={`option-${index}`}
                              onClick={() => toggleCorrectAnswer(index)}
                            />
                          </div>
                        </RadioGroup>
                      ) : (
                        <Checkbox
                          checked={currentQuestion.correctAnswers.includes(index)}
                          onCheckedChange={() => toggleCorrectAnswer(index)}
                          id={`option-${index}`}
                        />
                      )}
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Opción ${index + 1}`}
                        className="flex-1"
                      />
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeOption(index)}
                          className="h-8 w-8 text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={addOption} className="mt-2">
                    <Plus className="h-4 w-4 mr-1" /> Añadir opción
                  </Button>
                </div>
              )}

              <Button type="button" onClick={addQuestion} className="w-full">
                Añadir pregunta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Button type="submit" className="w-full" disabled={questions.length === 0}>
        <Save className="h-4 w-4 mr-2" /> Guardar examen
      </Button>
    </form>
  )
}

