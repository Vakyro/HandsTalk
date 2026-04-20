"use client"

import { motion } from 'framer-motion'
import { 
  Video, 
  MessageSquareText, 
  Zap, 
  Camera, 
  Upload, 
  BookOpen,
  Trophy,
  Users,
  Globe
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

const features = [
  {
    icon: MessageSquareText,
    title: 'Traducción Seña a Texto',
    description: 'Convierte videos de lengua de señas a texto con nuestra IA avanzada. Compatible con videos subidos y cámara en tiempo real.',
    color: 'primary',
  },
  {
    icon: Video,
    title: 'Videos Texto a Seña',
    description: 'Transforma texto escrito en interpretaciones naturales de lengua de señas en video. Elige entre múltiples estilos y velocidades.',
    color: 'secondary',
  },
  {
    icon: Camera,
    title: 'Modo de Traducción en Vivo',
    description: 'Interpretación en tiempo real mientras señas. Perfecto para comunicación instantánea y sesiones de práctica.',
    color: 'accent',
  },
  {
    icon: Upload,
    title: 'Subida y Procesamiento de Video',
    description: 'Sube videos pregrabados para traducción detallada a nivel de frase con puntuación de confianza y metadatos.',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Aprendizaje Estructurado',
    description: 'Avanza por cursos desde lo básico hasta lo avanzado. Sigue tu progreso con XP, rachas y logros.',
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'Práctica Interactiva',
    description: 'Opción múltiple, ejercicios de escritura, interpretación de video y desafíos de grabación propia.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Logros y Progreso',
    description: 'Gana insignias, mantén rachas y sigue tu crecimiento. El aprendizaje gamificado te mantiene motivado.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Accesibilidad Primero',
    description: 'Diseñado para usuarios sordos, hipoacúsicos y oyentes por igual. Rompiendo barreras para todos.',
    color: 'secondary',
  },
  {
    icon: Globe,
    title: 'Múltiples Lenguas de Señas',
    description: 'Soporte para LSM, ASL, BSL y más variantes regionales. Aprende la lengua más relevante para ti.',
    color: 'accent',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function FeaturesSection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Funcionalidades"
          title="Todo lo que Necesitas para Conectar"
          description="Una plataforma completa para traducción y aprendizaje de lengua de señas, impulsada por IA moderna y diseñada para todos."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
    >
      <div className={`inline-flex rounded-xl p-3 ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
