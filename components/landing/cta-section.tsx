"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-6 sm:p-10 lg:p-12"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center text-center">
            <div className="mb-6 rounded-2xl bg-white/20 p-4 backdrop-blur-sm">
              <Hand className="h-10 w-10 text-white" />
            </div>

            <h2 className="text-3xl font-bold text-white sm:text-4xl text-balance">
              ¿Listo para Romper las Barreras de Comunicación?
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-white/90 text-pretty">
              Únete a miles de usuarios que ya están traduciendo, aprendiendo
              y conectando a través de la lengua de señas. Comienza tu viaje hoy.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/sign-to-text">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-white text-primary hover:bg-white/90 text-base font-semibold"
                >
                  Probar Traducción
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 border-white/30 bg-white/10 text-white hover:bg-white/20 text-base"
                >
                  Comenzar a Aprender Gratis
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
