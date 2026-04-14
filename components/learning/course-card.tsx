"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Clock, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Course } from '@/lib/data/learning'

interface CourseCardProps {
  course: Course
  index?: number
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const progress = course.completedLessons / course.lessonCount * 100
  const isCompleted = progress === 100

  const levelColors = {
    beginner: 'bg-green-100 text-green-700 border-green-200',
    intermediate: 'bg-primary/10 text-primary border-primary/20',
    advanced: 'bg-accent/10 text-accent border-accent/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border/50 bg-card overflow-hidden transition-shadow hover:shadow-lg hover:border-primary/20"
    >
      {/* Course image placeholder */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary/40" />
        </div>
        
        {/* Level badge */}
        <span className={cn(
          "absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
          levelColors[course.level]
        )}>
          {course.level}
        </span>

        {/* Completed badge */}
        {isCompleted && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-green-500 px-2.5 py-0.5 text-xs font-medium text-white">
            <CheckCircle className="h-3 w-3" />
            Completed
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.lessonCount} lessons
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
        </div>

        {/* Progress bar */}
        {course.enrolled && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={cn(
                  "h-full rounded-full",
                  isCompleted ? "bg-green-500" : "bg-primary"
                )}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="mt-4">
          <Link href={`/learn/courses/${course.id}`}>
            <Button 
              variant={course.enrolled ? "default" : "outline"} 
              className={cn(
                "w-full gap-2",
                course.enrolled && "bg-primary hover:bg-primary/90"
              )}
            >
              {course.enrolled ? (
                isCompleted ? 'Review Course' : 'Continue Learning'
              ) : (
                'Start Course'
              )}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
