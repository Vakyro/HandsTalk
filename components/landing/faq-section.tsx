"use client"

import { SectionHeader } from '@/components/ui/section-header'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: '¿Qué lenguas de señas soporta HandsTalk?',
    answer: 'HandsTalk actualmente soporta la Lengua de Señas Mexicana (LSM) con planes de agregar otras variantes como la Lengua de Señas Americana (ASL), Lengua de Señas Británica (BSL) y Lengua de Señas Francesa (LSF). Cada lengua tiene su propia gramática y vocabulario únicos que nuestra IA está entrenada para reconocer y generar.',
  },
  {
    question: '¿Qué tan precisa es la traducción de seña a texto?',
    answer: 'Nuestra IA logra alta precisión en frases y gestos comunes, mostrando puntuaciones de confianza para cada traducción. Para mejores resultados en el Modo Normal, asegúrate de tener buena iluminación y una vista clara del firmante. El Modo En Vivo proporciona retroalimentación en tiempo real, aunque puede tener menor precisión en frases complejas.',
  },
  {
    question: '¿Cuál es la diferencia entre el Modo Normal y el Modo En Vivo?',
    answer: 'El Modo Normal te permite subir o grabar un video completo para un análisis detallado e interpretación a nivel de frase. El Modo En Vivo proporciona traducción en tiempo real mientras señas, ideal para comunicación instantánea. El Modo Normal es mejor para precisión, mientras que el Modo En Vivo es mejor para conversaciones.',
  },
  {
    question: '¿Cómo funciona la generación de video de texto a seña?',
    answer: 'Cuando ingresas texto, nuestra IA analiza la estructura de la frase y genera una interpretación natural en video de lengua de señas. Puedes ajustar la velocidad de reproducción, elegir variantes regionales y seleccionar estilos de avatar. Los videos generados muestran gramática correcta, incluyendo expresiones faciales y movimiento corporal.',
  },
  {
    question: '¿HandsTalk es gratuito?',
    answer: 'HandsTalk ofrece un nivel gratuito con acceso a funciones básicas de traducción y contenido de aprendizaje. Las funciones premium incluyen traducciones ilimitadas, cursos avanzados de aprendizaje, análisis detallados y procesamiento prioritario. Consulta nuestra página de precios para los planes actuales.',
  },
  {
    question: '¿Puedo guardar mis traducciones?',
    answer: '¡Sí! Cuando hayas iniciado sesión, puedes guardar tanto las traducciones de seña a texto como de texto a seña en tu biblioteca personal. Accede a ellas en cualquier momento desde la sección Guardados para revisarlas, reproducirlas o compartirlas.',
  },
  {
    question: '¿Cómo funciona el sistema de aprendizaje?',
    answer: 'Nuestra plataforma de aprendizaje usa un enfoque gamificado inspirado en aplicaciones de aprendizaje de idiomas. Avanza por cursos estructurados, practica con ejercicios interactivos, gana XP e insignias y mantén rachas diarias. Las actividades incluyen opción múltiple, escribir respuestas, ver e interpretar videos y grabarte a ti mismo.',
  },
  {
    question: '¿Necesito equipo especial?',
    answer: 'No se necesita equipo especial. Cualquier dispositivo con cámara (teléfono, tablet, laptop) funciona para la traducción de seña a texto. Para la mejor experiencia, asegúrate de tener buena iluminación y posiciónate de modo que tu torso superior y manos sean claramente visibles.',
  },
]

export function FAQSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Preguntas Frecuentes"
          title="Preguntas Frecuentes"
          description="Todo lo que necesitas saber sobre el uso de HandsTalk para traducción y aprendizaje."
        />

        <Accordion type="single" collapsible className="mt-8">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-border/50"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline text-base">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
