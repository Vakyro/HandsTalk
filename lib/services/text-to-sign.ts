// Mock service for Text-to-Sign video generation
// In production, this would connect to an AI video generation backend

export interface SignVideoResult {
  id: string
  originalText: string
  videoUrl: string
  thumbnailUrl: string
  duration: number
  language: string
  variation: string
  avatarStyle: string
  createdAt: string
}

export interface GenerationOptions {
  language?: string
  variation?: string
  avatarStyle?: string
  playbackSpeed?: number
  includeSubtitles?: boolean
}

// Mock video URLs - in production these would be generated videos
const mockVideoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
]

export async function generateSignVideo(
  text: string,
  options: GenerationOptions = {},
  onProgress?: (progress: number) => void
): Promise<SignVideoResult> {
  const {
    language = 'ASL',
    variation = 'standard',
    avatarStyle = 'realistic',
  } = options

  // Simulate generation progress
  const stages = [5, 15, 30, 50, 70, 85, 95, 100]
  
  for (const progress of stages) {
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 400))
    onProgress?.(progress)
  }

  // Calculate mock duration based on text length
  const wordCount = text.split(/\s+/).length
  const duration = Math.max(3, wordCount * 1.5)

  return {
    id: 'video_' + Date.now(),
    originalText: text,
    videoUrl: mockVideoUrls[Math.floor(Math.random() * mockVideoUrls.length)],
    thumbnailUrl: '/placeholder-sign-thumbnail.jpg',
    duration,
    language,
    variation,
    avatarStyle,
    createdAt: new Date().toISOString(),
  }
}

export const availableLanguages = [
  { code: 'ASL', name: 'American Sign Language' },
  { code: 'BSL', name: 'British Sign Language' },
  { code: 'LSF', name: 'French Sign Language' },
  { code: 'DGS', name: 'German Sign Language' },
  { code: 'JSL', name: 'Japanese Sign Language' },
]

export const availableVariations = [
  { code: 'standard', name: 'Standard' },
  { code: 'formal', name: 'Formal' },
  { code: 'casual', name: 'Casual' },
]

export const avatarStyles = [
  { code: 'realistic', name: 'Realistic' },
  { code: 'animated', name: 'Animated' },
  { code: 'minimal', name: 'Minimal' },
]
