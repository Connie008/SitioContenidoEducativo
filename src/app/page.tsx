"use client"

import { SearchBar } from "@/components/search-bar"
import { VideoList } from "@/components/video-list"
import { useState, useEffect } from "react"

// Datos de ejemplo para los videos educativos
const videosData = [
  {
    id: 1,
    title: "Introducción a la Programación",
    description: "Aprende los conceptos básicos de la programación desde cero.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "45:30",
    author: "Prof. García",
    views: 12500,
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Matemáticas Avanzadas",
    description: "Curso completo de cálculo diferencial e integral.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "1:20:15",
    author: "Dra. Martínez",
    views: 8700,
    date: "2023-11-02",
  },
  {
    id: 3,
    title: "Historia del Arte Moderno",
    description: "Recorrido por las principales corrientes artísticas del siglo XX.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "55:20",
    author: "Prof. Rodríguez",
    views: 6300,
    date: "2023-09-28",
  },
  {
    id: 4,
    title: "Física Cuántica para Principiantes",
    description: "Explicación simplificada de los conceptos fundamentales de la física cuántica.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "1:05:45",
    author: "Dr. López",
    views: 9200,
    date: "2023-10-20",
  },
  {
    id: 5,
    title: "Inglés Conversacional",
    description: "Mejora tus habilidades de conversación en inglés con situaciones cotidianas.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "38:15",
    author: "Prof. Smith",
    views: 15800,
    date: "2023-11-10",
  },
  {
    id: 6,
    title: "Desarrollo Web con React",
    description: "Aprende a crear aplicaciones web modernas con React desde cero.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "2:15:30",
    author: "Ing. Pérez",
    views: 18900,
    date: "2023-10-05",
  },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState(videosData)

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setVideos(videosData)
      return
    }

    const filteredVideos = videosData.filter(
      (video) =>
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.description.toLowerCase().includes(query.toLowerCase()),
    )

    setVideos(filteredVideos)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Plataforma Educativa</h1>
          <p className="text-gray-600 text-center mb-6">Descubre y aprende con nuestros contenidos educativos</p>
          <SearchBar onSearch={handleSearch} />
        </header>

        <section>
          <h2 className="text-xl font-semibold mb-4">
            {searchQuery ? `Resultados para "${searchQuery}"` : "Videos Disponibles"}
          </h2>
          <VideoList videos={videos} />

          {videos.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No se encontraron videos que coincidan con tu búsqueda.</p>
              <button
                onClick={() => handleSearch("")}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Ver todos los videos
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

