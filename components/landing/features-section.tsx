"use client"

import { motion } from 'framer-motion'
import { 
  Video, 
  MessageSquareText, 
  Zap, 
  Camera, 
  Upload, 
  BookOpen,
  Trophy,
  Users,
  Globe
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

const features = [
  {
    icon: MessageSquareText,
    title: 'Sign to Text Translation',
    description: 'Convert sign language videos to text with our advanced AI. Supports both uploaded videos and real-time camera input.',
    color: 'primary',
  },
  {
    icon: Video,
    title: 'Text to Sign Videos',
    description: 'Transform written text into natural sign language video performances. Choose from multiple styles and speeds.',
    color: 'secondary',
  },
  {
    icon: Camera,
    title: 'Live Translation Mode',
    description: 'Real-time interpretation as you sign. Perfect for instant communication and practice sessions.',
    color: 'accent',
  },
  {
    icon: Upload,
    title: 'Video Upload & Process',
    description: 'Upload pre-recorded videos for detailed phrase-level translation with confidence scoring and metadata.',
    color: 'primary',
  },
  {
    icon: BookOpen,
    title: 'Structured Learning',
    description: 'Progress through courses from basics to advanced. Track your journey with XP, streaks, and achievements.',
    color: 'secondary',
  },
  {
    icon: Zap,
    title: 'Interactive Practice',
    description: 'Multiple choice, typing exercises, video interpretation, and record-yourself challenges.',
    color: 'accent',
  },
  {
    icon: Trophy,
    title: 'Achievements & Progress',
    description: 'Earn badges, maintain streaks, and track your growth. Gamified learning keeps you motivated.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Accessibility First',
    description: 'Designed for deaf, hard-of-hearing, and hearing users alike. Breaking barriers for everyone.',
    color: 'secondary',
  },
  {
    icon: Globe,
    title: 'Multiple Sign Languages',
    description: 'Support for ASL, BSL, and more regional variations. Learn the language relevant to you.',
    color: 'accent',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
}

export function FeaturesSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Features"
          title="Everything You Need to Connect"
          description="A complete platform for sign language translation and learning, powered by modern AI and designed for everyone."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: React.ElementType
  title: string
  description: string
  color: 'primary' | 'secondary' | 'accent'
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent/10 text-accent',
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg"
    >
      <div className={`inline-flex rounded-xl p-3 ${colorClasses[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
