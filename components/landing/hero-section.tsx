"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Video, MessageSquareText, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Plataforma de Lengua de Señas con IA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            Rompiendo Barreras de{' '}
            <span className="text-primary">Comunicación</span>
            <br />
            Una Seña a la Vez
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground text-pretty"
          >
            Traduce lengua de señas a texto, genera videos en señas desde texto
            y aprende a tu propio ritmo. Haciendo la comunicación accesible para todos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/sign-to-text">
              <Button size="lg" className="h-12 px-8 bg-primary text-base cursor-pointer hover:bg-secondary hover:text-secondary-foreground transition-colors duration-300">
                Comenzar a Traducir
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-border/50 hover:bg-muted hover:text-foreground transition-colors duration-300 cursor-pointer">
                Comenzar a Aprender
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature preview cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid gap-4 sm:grid-cols-3 lg:mt-14"
        >
          <PreviewCard
            icon={MessageSquareText}
            title="Seña a Texto"
            description="Sube videos o usa la cámara en vivo para traducción instantánea"
            href="/sign-to-text"
            color="primary"
          />
          <PreviewCard
            icon={Video}
            title="Texto a Seña"
            description="Genera videos de lengua de señas desde cualquier texto"
            href="/text-to-sign"
            color="secondary"
          />
          <PreviewCard
            icon={GraduationCap}
            title="Aprende y Practica"
            description="Lecciones interactivas y juegos para dominar la lengua de señas"
            href="/learn"
            color="accent"
          />
        </motion.div>
      </div>
    </section>
  )
}

function PreviewCard({ 
  icon: Icon, 
  title, 
  description, 
  href,
  color 
}: { 
  icon: React.ElementType
  title: string
  description: string
  href: string
  color: 'primary' | 'secondary' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground group-hover:bg-secondary/80',
    accent: 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
  }

  return (
    <Link href={href} className="group">
      <div className="flex flex-col items-center rounded-2xl border border-border/50 bg-card p-6 text-center transition-all hover:border-primary/30 hover:shadow-lg">
        <div className={`rounded-xl p-3 transition-colors ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="mt-4 font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
