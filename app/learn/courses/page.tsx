"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { BookOpen, Filter } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { CourseCard } from '@/components/learning/course-card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/context/auth-context'
import { courses } from '@/lib/data/learning'

type Level = 'all' | 'beginner' | 'intermediate' | 'advanced'

export default function CoursesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [level, setLevel] = useState<Level>('all')

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const filteredCourses = level === 'all' 
    ? courses 
    : courses.filter(c => c.level === level)

  const enrolledCount = courses.filter(c => c.enrolled).length
  const completedCount = courses.filter(c => c.completedLessons === c.lessonCount && c.enrolled).length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-primary/10 p-2">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Courses</h1>
          </div>
          <p className="text-muted-foreground">
            Structured learning paths from basics to advanced sign language
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3">
            <p className="text-2xl font-bold text-foreground">{courses.length}</p>
            <p className="text-sm text-muted-foreground">Total Courses</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3">
            <p className="text-2xl font-bold text-primary">{enrolledCount}</p>
            <p className="text-sm text-muted-foreground">Enrolled</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3">
            <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-8">
          <Tabs value={level} onValueChange={(v) => setLevel(v as Level)}>
            <TabsList>
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Course grid */}
        <motion.div
          key={level}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredCourses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">No courses found for this level</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
