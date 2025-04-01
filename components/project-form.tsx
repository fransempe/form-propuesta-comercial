"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "El nombre del proyecto debe tener al menos 2 caracteres.",
  }),
  projectType: z.string({
    required_error: "Por favor selecciona un tipo de proyecto.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  functionalities: z.string().min(10, {
    message: "Las funcionalidades deben tener al menos 10 caracteres.",
  }).optional(),
  complexity: z.string().optional(),
  timeframe: z.string().optional(),
  team: z.string().optional(),
})

export default function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectType: "",
      description: "",
      functionalities: "",
      complexity: "",
      timeframe: "",
      team: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simular espera de webhook
    try {
      // Aquí iría la llamada al webhook
      fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: "POST",
        body: JSON.stringify(values),
      })
      console.log(values)

      // Simulamos una espera
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Webhook completado
      alert("Formulario enviado con éxito")
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Error al enviar el formulario")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-8 bg-white/10 backdrop-blur-sm border-purple-500/20 shadow-xl rounded-xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Nombre del proyecto
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingresa el nombre del proyecto"
                    {...field}
                    className="bg-white/20 border-purple-500/30 text-white placeholder:text-white/50 focus-visible:ring-purple-500 font-inter text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Tipo de proyecto
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/20 border-purple-500/30 text-white focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona el tipo de proyecto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-purple-900 text-white border-purple-500/30">
                    <SelectItem value="chatbot" className="focus:bg-purple-800">
                      Chatbot
                    </SelectItem>
                    <SelectItem value="backoffice" className="focus:bg-purple-800">
                      Backoffice
                    </SelectItem>
                    <SelectItem value="mobile" className="focus:bg-purple-800">
                      Aplicación Mobile
                    </SelectItem>
                    <SelectItem value="web" className="focus:bg-purple-800">
                      Aplicación Web
                    </SelectItem>
                    <SelectItem value="otros" className="focus:bg-purple-800">
                      Otros
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Descripción del proyecto
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe tu proyecto"
                    {...field}
                    className="bg-white/20 border-purple-500/30 text-white placeholder:text-white/50 focus-visible:ring-purple-500 min-h-24 font-inter text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="functionalities"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Notas adicionales
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Autenticación, Integración API Mercado Pago, OpenAI, etc."
                    {...field}
                    className="bg-white/20 border-purple-500/30 text-white placeholder:text-white/50 focus-visible:ring-purple-500 min-h-24 font-inter text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="complexity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Complejidad
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/20 border-purple-500/30 text-white focus:ring-purple-500">
                      <SelectValue placeholder="Selecciona la complejidad" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-purple-900 text-white border-purple-500/30">
                    <SelectItem value="alta" className="focus:bg-purple-800">
                      Alta
                    </SelectItem>
                    <SelectItem value="media" className="focus:bg-purple-800">
                      Media
                    </SelectItem>
                    <SelectItem value="baja" className="focus:bg-purple-800">
                      Baja
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Plazo requerido
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ej: 3 meses, 6 semanas"
                    {...field}
                    className="bg-white/20 border-purple-500/30 text-white placeholder:text-white/50 focus-visible:ring-purple-500 font-inter text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-raleway text-base tracking-wide font-medium">
                  Equipo disponible
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe el equipo disponible para el proyecto"
                    {...field}
                    className="bg-white/20 border-purple-500/30 text-white placeholder:text-white/50 focus-visible:ring-purple-500 font-inter text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 border-none font-raleway text-lg tracking-wide mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Proyecto"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  )
}

