"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PdfUpload } from "@/components/admin/pdf-upload"
import { PdfList } from "@/components/admin/pdf-list"
import { ExamCreator } from "@/components/admin/exam-creator"
import { ExamList } from "@/components/admin/exam-list"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("documentos")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Panel de Administración</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/examenes">
              <Button variant="outline">Ver Exámenes</Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Ver Videos</Button>
            </Link>
          </div>
        </div>

        <Tabs defaultValue="documentos" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="documentos">Documentos PDF</TabsTrigger>
            <TabsTrigger value="examenes">Exámenes y Cuestionarios</TabsTrigger>
          </TabsList>

          <TabsContent value="documentos" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Subir Nuevo PDF</h2>
                <PdfUpload />
              </div>

              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Documentos Subidos</h2>
                <PdfList />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="examenes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Crear Nuevo Examen</h2>
                <ExamCreator />
              </div>

              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Exámenes Creados</h2>
                <ExamList />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
