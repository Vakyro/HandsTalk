"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Gamepad2 } from 'lucide-react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { GameCard } from '@/components/learning/game-card'
import { useAuth } from '@/lib/context/auth-context'
import { games } from '@/lib/data/learning'

export default function GamesPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return null
  }

  const totalPlays = games.reduce((acc, g) => acc + g.playCount, 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-xl bg-secondary p-2">
              <Gamepad2 className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Practice Games</h1>
          </div>
          <p className="text-muted-foreground">
            Fun and interactive ways to practice your sign language skills
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3">
            <p className="text-2xl font-bold text-foreground">{games.length}</p>
            <p className="text-sm text-muted-foreground">Games Available</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card px-4 py-3">
            <p className="text-2xl font-bold text-primary">{totalPlays}</p>
            <p className="text-sm text-muted-foreground">Total Plays</p>
          </div>
        </div>

        {/* Games grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
