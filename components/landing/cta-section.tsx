"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Hand } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 lg:p-16"
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
              Ready to Break Communication Barriers?
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-white/90 text-pretty">
              Join thousands of users who are already translating, learning, 
              and connecting through sign language. Start your journey today.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/sign-to-text">
                <Button 
                  size="lg" 
                  className="h-12 px-8 bg-white text-primary hover:bg-white/90 text-base font-semibold"
                >
                  Try Translation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 border-white/30 bg-white/10 text-white hover:bg-white/20 text-base"
                >
                  Start Learning Free
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
