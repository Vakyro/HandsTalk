"use client"

import { motion } from 'framer-motion'
import { Upload, Video, Zap, Type, Play, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

export function HowItWorksSection() {
  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Cómo Funciona"
          title="Traducción Simple y Poderosa"
          description="Ya sea que traduzcas seña a texto o texto a seña, nuestra plataforma lo hace sencillo."
        />

        <div className="mt-10 space-y-12">
          {/* Sign to Text Flow */}
          <div>
            <h3 className="text-center text-lg font-bold text-foreground mb-6">
              Traducción Seña a Texto
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Normal Mode */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border/50 bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Modo Normal</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ideal para interpretación de frases completas con análisis detallado
                </p>
                <div className="space-y-4">
                  <Step number={1} text="Sube o graba un video señando" />
                  <Step number={2} text="La IA procesa el video completo" />
                  <Step number={3} text="Obtén la interpretación completa con puntuación de confianza" />
                </div>
              </motion.div>

              {/* Live Mode */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border/50 bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-full bg-accent/10 p-2">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Modo En Vivo</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ideal para comunicación instantánea y práctica en tiempo real
                </p>
                <div className="space-y-4">
                  <Step number={1} text="Activa tu cámara" />
                  <Step number={2} text="Seña naturalmente frente a la cámara" />
                  <Step number={3} text="Ve la transcripción en vivo mientras señas" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text to Sign Flow */}
          <div>
            <h3 className="text-center text-lg font-bold text-foreground mb-6">
              Generación de Video Texto a Seña
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <FlowStep
                  icon={Type}
                  title="Ingresar Texto"
                  description="Escribe cualquier frase u oración"
                />
                <ArrowIcon />
                <FlowStep
                  icon={Video}
                  title="Generar"
                  description="La IA crea el video de lengua de señas"
                />
                <ArrowIcon />
                <FlowStep
                  icon={Play}
                  title="Ver y Guardar"
                  description="Visualiza, ajusta velocidad y guarda"
                />
              </div>
            </motion.div>
          </div>

          {/* Learning Flow */}
          <div>
            <h3 className="text-center text-lg font-bold text-foreground mb-6">
              Aprende a Tu Propio Ritmo
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <FlowStep
                  icon={BookOpen}
                  title="Elegir Curso"
                  description="Selecciona tu nivel de habilidad"
                  color="secondary"
                />
                <ArrowIcon />
                <FlowStep
                  icon={Play}
                  title="Practicar"
                  description="Ejercicios interactivos"
                  color="secondary"
                />
                <ArrowIcon />
                <FlowStep
                  icon={Zap}
                  title="Ganar Recompensas"
                  description="XP, insignias y rachas"
                  color="secondary"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </span>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  )
}

function FlowStep({ 
  icon: Icon, 
  title, 
  description,
  color = 'primary'
}: { 
  icon: React.ElementType
  title: string
  description: string
  color?: 'primary' | 'secondary'
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`rounded-xl p-3 ${color === 'primary' ? 'bg-primary/10' : 'bg-secondary'}`}>
        <Icon className={`h-6 w-6 ${color === 'primary' ? 'text-primary' : 'text-secondary-foreground'}`} />
      </div>
      <h4 className="mt-3 font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg 
      className="h-6 w-6 text-muted-foreground/50 shrink-0 hidden sm:block rotate-0 sm:rotate-0" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
