import Image from "next/image"
import { Clock, Eye, Calendar } from "lucide-react"

interface Video {
  id: number
  title: string
  description: string
  thumbnail: string
  duration: string
  author: string
  views: number
  date: string
}

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  // Función para formatear el número de vistas
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <Image
          src={video.thumbnail || "/placeholder.svg"}
          alt={video.title}
          width={320}
          height={180}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center">
          <Clock size={14} className="mr-1" />
          {video.duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>

        <div className="text-sm text-gray-500">
          <p className="font-medium mb-2">{video.author}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Eye size={14} className="mr-1" />
              <span>{formatViews(video.views)} vistas</span>
            </div>

            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(video.date)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-medium py-2 rounded-md transition-colors">
          Ver video
        </button>
      </div>
    </div>
  )
}

