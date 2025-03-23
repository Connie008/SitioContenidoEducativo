"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, ClipboardList } from "lucide-react"

export function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Plataforma Educativa
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <Video className="h-4 w-4" />
              Videos
            </Link>
            <Link href="/examenes" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <ClipboardList className="h-4 w-4" />
              Exámenes
            </Link>
            <Link href="/admin" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <BookOpen className="h-4 w-4" />
              Documentos
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Administración
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

