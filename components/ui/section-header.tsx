"use client"

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  badge?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({ 
  badge, 
  title, 
  description, 
  align = 'center',
  className 
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "max-w-3xl",
        align === 'center' && "mx-auto text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
          {badge}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </motion.div>
  )
}
