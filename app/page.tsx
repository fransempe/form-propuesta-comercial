"use client"

import ProjectForm from "@/components/project-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-light text-white text-center mb-2 font-raleway tracking-tight">
          Estimador de Propuestas Comerciales
        </h1>
        <p className="text-md md:text-xl font-light text-white/80 text-center mb-12 font-raleway tracking-wide max-w-2xl mx-auto">
          Con el poder de la IA, impulsamos la innovación y la transformación de tu negocio.
        </p>
        <ProjectForm />
      </div>
    </main>
  )
}

