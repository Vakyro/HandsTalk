"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface AppCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function AppCard({ 
  children, 
  className, 
  hover = true,
  padding = 'md' 
}: AppCardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-2xl border border-border/50 bg-card shadow-sm",
        hover && "transition-shadow hover:shadow-lg hover:border-primary/20",
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </motion.div>
  )
}
