"use client"

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  X, 
  Camera,
  Lightbulb,
  RotateCcw,
  Trophy
} from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/context/auth-context'
import { sampleExercises, type Exercise } from '@/lib/data/learning'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface PracticePageProps {
  params: Promise<{ id: string }>
}

export default function PracticePage({ params }: PracticePageProps) {
  const { id } = use(params)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const exercises = sampleExercises
  const currentExercise = exercises[currentIndex]
  const progress = ((currentIndex + 1) / exercises.length) * 100

  const handleSubmit = () => {
    const answer = currentExercise.type === 'multiple_choice' 
      ? selectedAnswer 
      : typedAnswer.trim().toLowerCase()
    
    const correct = answer === currentExercise.correctAnswer.toLowerCase()
    setIsCorrect(correct)
    setIsSubmitted(true)
    
    if (correct) {
      setScore(s => s + 10)
      toast.success('Correct! +10 XP')
    } else {
      toast.error('Not quite right. Try the next one!')
    }
  }

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(i => i + 1)
      resetState()
    } else {
      setCompleted(true)
    }
  }

  const handleRetry = () => {
    setCurrentIndex(0)
    setScore(0)
    setCompleted(false)
    resetState()
  }

  const resetState = () => {
    setSelectedAnswer(null)
    setTypedAnswer('')
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowHint(false)
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 rounded-full bg-primary/10 p-6 w-fit">
              <Trophy className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Practice Complete!</h1>
            <p className="mt-2 text-muted-foreground">
              You scored {score} XP in this practice session
            </p>
            
            <div className="mt-8 rounded-2xl border border-border/50 bg-card p-6">
              <div className="text-4xl font-bold text-primary mb-2">{score} XP</div>
              <p className="text-sm text-muted-foreground">
                {exercises.length} exercises completed
              </p>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <Button variant="outline" onClick={() => router.push('/learn')}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Learn
              </Button>
              <Button onClick={handleRetry} className="bg-primary hover:bg-primary/90">
                <RotateCcw className="mr-2 h-4 w-4" />
                Practice Again
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/learn')}
            className="gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit
          </Button>
          <div className="text-sm text-muted-foreground">
            {currentIndex + 1} / {exercises.length}
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {score} XP
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full bg-primary"
          />
        </div>

        {/* Exercise card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="rounded-2xl border border-border/50 bg-card p-6"
          >
            {/* Exercise type badge */}
            <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
              {currentExercise.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>

            {/* Question */}
            <h2 className="text-xl font-semibold text-foreground mb-6">
              {currentExercise.question}
            </h2>

            {/* Media placeholder */}
            {(currentExercise.imageUrl || currentExercise.videoUrl) && (
              <div className="mb-6 aspect-video rounded-xl bg-muted flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Camera className="mx-auto h-12 w-12 mb-2" />
                  <p className="text-sm">Sign language demonstration</p>
                </div>
              </div>
            )}

            {/* Answer input based on type */}
            {currentExercise.type === 'multiple_choice' && currentExercise.options && (
              <div className="space-y-3">
                {currentExercise.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => !isSubmitted && setSelectedAnswer(option)}
                    disabled={isSubmitted}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-colors",
                      selectedAnswer === option
                        ? isSubmitted
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : option === currentExercise.correctAnswer
                              ? "border-green-500 bg-green-50"
                              : "border-accent bg-accent/10"
                          : "border-primary bg-primary/5"
                        : isSubmitted && option === currentExercise.correctAnswer
                          ? "border-green-500 bg-green-50"
                          : "border-border/50 hover:border-primary/50 hover:bg-muted/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{option}</span>
                      {isSubmitted && option === currentExercise.correctAnswer && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {isSubmitted && selectedAnswer === option && !isCorrect && option !== currentExercise.correctAnswer && (
                        <X className="h-5 w-5 text-accent" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {(currentExercise.type === 'type_answer' || currentExercise.type === 'watch_and_interpret') && (
              <div className="space-y-4">
                <Input
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  placeholder="Type your answer..."
                  disabled={isSubmitted}
                  className={cn(
                    "h-12 text-lg border-border/50",
                    isSubmitted && (isCorrect ? "border-green-500" : "border-accent")
                  )}
                />
                {isSubmitted && !isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    Correct answer: <span className="font-medium text-foreground">{currentExercise.correctAnswer}</span>
                  </p>
                )}
              </div>
            )}

            {currentExercise.type === 'record_yourself' && (
              <div className="space-y-4">
                <div className="aspect-video rounded-xl bg-muted flex flex-col items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Camera preview would appear here</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sign: "{currentExercise.correctAnswer}"
                  </p>
                </div>
                {!isSubmitted && (
                  <Button 
                    onClick={handleSubmit}
                    className="w-full gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Camera className="h-4 w-4" />
                    Submit Recording
                  </Button>
                )}
              </div>
            )}

            {/* Hint */}
            {currentExercise.hint && !isSubmitted && (
              <div className="mt-4">
                {showHint ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="rounded-xl bg-secondary/50 p-4"
                  >
                    <div className="flex items-start gap-2">
                      <Lightbulb className="h-5 w-5 text-secondary-foreground shrink-0" />
                      <p className="text-sm text-secondary-foreground">{currentExercise.hint}</p>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowHint(true)}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Show hint
                  </button>
                )}
              </div>
            )}

            {/* Actions */}
            {currentExercise.type !== 'record_yourself' && (
              <div className="mt-6 flex justify-end gap-3">
                {!isSubmitted ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={currentExercise.type === 'multiple_choice' ? !selectedAnswer : !typedAnswer.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="gap-2 bg-primary hover:bg-primary/90"
                  >
                    {currentIndex < exercises.length - 1 ? 'Continue' : 'Finish'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}
