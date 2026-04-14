"use client"

import { motion } from 'framer-motion'
import { Upload, Video, Zap, Type, Play, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-muted/30 to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="How It Works"
          title="Simple, Powerful Translation"
          description="Whether you're translating sign to text or text to sign, our platform makes it seamless."
        />

        <div className="mt-16 space-y-20">
          {/* Sign to Text Flow */}
          <div>
            <h3 className="text-center text-xl font-bold text-foreground mb-10">
              Sign to Text Translation
            </h3>
            <div className="grid gap-8 md:grid-cols-2">
              {/* Normal Mode */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border/50 bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Normal Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Best for full-phrase interpretation with detailed analysis
                </p>
                <div className="space-y-4">
                  <Step number={1} text="Upload or record a video of signing" />
                  <Step number={2} text="AI processes the complete video" />
                  <Step number={3} text="Get full interpretation with confidence score" />
                </div>
              </motion.div>

              {/* Live Mode */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border/50 bg-card p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-full bg-accent/10 p-2">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground">Live Mode</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  Best for instant communication and real-time practice
                </p>
                <div className="space-y-4">
                  <Step number={1} text="Start your camera" />
                  <Step number={2} text="Sign naturally to the camera" />
                  <Step number={3} text="See live transcription as you sign" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Text to Sign Flow */}
          <div>
            <h3 className="text-center text-xl font-bold text-foreground mb-10">
              Text to Sign Video Generation
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <FlowStep 
                  icon={Type} 
                  title="Enter Text" 
                  description="Type any phrase or sentence"
                />
                <ArrowIcon />
                <FlowStep 
                  icon={Video} 
                  title="Generate" 
                  description="AI creates sign language video"
                />
                <ArrowIcon />
                <FlowStep 
                  icon={Play} 
                  title="Watch & Save" 
                  description="View, adjust speed, and save"
                />
              </div>
            </motion.div>
          </div>

          {/* Learning Flow */}
          <div>
            <h3 className="text-center text-xl font-bold text-foreground mb-10">
              Learn at Your Own Pace
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto max-w-3xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <FlowStep 
                  icon={BookOpen} 
                  title="Choose Course" 
                  description="Pick your skill level"
                  color="secondary"
                />
                <ArrowIcon />
                <FlowStep 
                  icon={Play} 
                  title="Practice" 
                  description="Interactive exercises"
                  color="secondary"
                />
                <ArrowIcon />
                <FlowStep 
                  icon={Zap} 
                  title="Earn Rewards" 
                  description="XP, badges, and streaks"
                  color="secondary"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
        {number}
      </span>
      <span className="text-sm text-foreground">{text}</span>
    </div>
  )
}

function FlowStep({ 
  icon: Icon, 
  title, 
  description,
  color = 'primary'
}: { 
  icon: React.ElementType
  title: string
  description: string
  color?: 'primary' | 'secondary'
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`rounded-2xl p-4 ${color === 'primary' ? 'bg-primary/10' : 'bg-secondary'}`}>
        <Icon className={`h-8 w-8 ${color === 'primary' ? 'text-primary' : 'text-secondary-foreground'}`} />
      </div>
      <h4 className="mt-3 font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

function ArrowIcon() {
  return (
    <svg 
      className="h-6 w-6 text-muted-foreground/50 shrink-0 hidden sm:block rotate-0 sm:rotate-0" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  )
}
