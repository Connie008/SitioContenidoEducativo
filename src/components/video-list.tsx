import { VideoCard } from "./video-card"

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

interface VideoListProps {
  videos: Video[]
}

export function VideoList({ videos }: VideoListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
