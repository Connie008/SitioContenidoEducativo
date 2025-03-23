"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, X, File } from "lucide-react"

export function PdfUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile)
      } else {
        alert("Por favor, selecciona un archivo PDF.")
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      } else {
        alert("Por favor, selecciona un archivo PDF.")
      }
    }
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !title || !category) {
      alert("Por favor, completa todos los campos requeridos.")
      return
    }

    setUploading(true)

    // Simulación de carga
    setTimeout(() => {
      // En una aplicación real, aquí se enviaría el archivo al servidor
      console.log("Archivo subido:", {
        file,
        title,
        description,
        category,
      })

      // Resetear el formulario
      setFile(null)
      setTitle("")
      setDescription("")
      setCategory("")
      setUploading(false)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      alert("PDF subido correctamente")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${file ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-primary"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="space-y-2">
            <FileUp className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              <p>Arrastra y suelta un archivo PDF aquí</p>
              <p>o</p>
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="mt-2">
                Seleccionar archivo
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white p-3 rounded border">
            <div className="flex items-center">
              <File className="h-8 w-8 text-blue-500 mr-2" />
              <div className="text-left">
                <p className="text-sm font-medium truncate" style={{ maxWidth: "150px" }}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={removeFile} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="application/pdf" className="hidden" />
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="title">Título del documento *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Guía de Matemáticas Avanzadas"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripción del contenido del documento..."
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="category">Categoría *</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una categoría" />
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
      </div>

      <Button type="submit" className="w-full" disabled={uploading}>
        {uploading ? "Subiendo..." : "Subir PDF"}
      </Button>
    </form>
  )
}

