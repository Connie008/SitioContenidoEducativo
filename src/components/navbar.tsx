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

