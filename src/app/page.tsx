"use client"
import { SearchBar } from "@/components/search-bar"
import { VideoList } from "@/components/video-list"
import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardList, FileText } from "lucide-react"
import { useState } from "react"

// Datos de ejemplo para los videos educativos
const videosData = [
  {
    id: 1,
    title: "Introducción a la Programación",
    description: "Aprende los conceptos básicos de la programación desde cero.",
    thumbnail: "/intro-programacion.jpg?height=180&width=320",
    duration: "45:30",
    author: "Prof. García",
    views: 12500,
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "Matemáticas Avanzadas",
    description: "Curso completo de cálculo diferencial e integral.",
    thumbnail: "/mate.jpg?height=180&width=320",
    duration: "1:20:15",
    author: "Dra. Martínez",
    views: 8700,
    date: "2023-11-02",
  },
  {
    id: 3,
    title: "Historia del Arte Moderno",
    description: "Recorrido por las principales corrientes artísticas del siglo XX.",
    thumbnail: "/historia-arte.avif?height=180&width=320",
    duration: "55:20",
    author: "Prof. Rodríguez",
    views: 6300,
    date: "2023-09-28",
  },
  {
    id: 4,
    title: "Física Cuántica para Principiantes",
    description: "Explicación simplificada de los conceptos fundamentales de la física cuántica.",
    thumbnail: "/fisica-cuantica.jpeg?height=180&width=320",
    duration: "1:05:45",
    author: "Dr. López",
    views: 9200,
    date: "2023-10-20",
  },
  {
    id: 5,
    title: "Inglés Conversacional",
    description: "Mejora tus habilidades de conversación en inglés con situaciones cotidianas.",
    thumbnail: "/ingles.jpg?height=180&width=320",
    duration: "38:15",
    author: "Prof. Smith",
    views: 15800,
    date: "2023-11-10",
  },
  {
    id: 6,
    title: "Desarrollo Web con React",
    description: "Aprende a crear aplicaciones web modernas con React desde cero.",
    thumbnail: "/dev.jpg?height=180&width=320",
    duration: "2:15:30",
    author: "Ing. Pérez",
    views: 18900,
    date: "2023-10-05",
  },
]

export default function Home() {
  const [videos, setVideos] = useState(videosData)

  const handleSearch = (query: string) => {

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
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Plataforma Educativa</h1>
          <p className="text-gray-600 text-center mb-6">Descubre y aprende con nuestros contenidos educativos</p>
          <SearchBar onSearch={handleSearch} />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Link href="/examenes" className="block">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Exámenes</h2>
                <ClipboardList className="h-8 w-8" />
              </div>
              <p className="text-blue-100 mb-4">Pon a prueba tus conocimientos con nuestros exámenes interactivos.</p>
              <Button variant="secondary" className="w-full">
                Ver exámenes
              </Button>
            </div>
          </Link>

          <Link href="/admin" className="block">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Documentos</h2>
                <FileText className="h-8 w-8" />
              </div>
              <p className="text-purple-100 mb-4">Accede a nuestra biblioteca de documentos y materiales de estudio.</p>
              <Button variant="secondary" className="w-full">
                Ver documentos
              </Button>
            </div>
          </Link>

          <Link href="/admin" className="block">
            <div className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Administración</h2>
                <FileText className="h-8 w-8" />
              </div>
              <p className="text-green-100 mb-4">Gestiona contenidos, crea exámenes y sube documentos.</p>
              <Button variant="secondary" className="w-full">
                Panel de admin
              </Button>
            </div>
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-4">Videos Disponibles</h2>
          <VideoList videos={videos} />
        </section>
      </div>
    </main>
  )
}
