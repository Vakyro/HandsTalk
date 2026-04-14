// Mock service for Sign-to-Text translation
// In production, this would connect to an ML backend

export interface TranslationResult {
  id: string
  text: string
  confidence: number
  glosses: string[]
  motionCues: string[]
  facialExpressions: string[]
  timestamp: string
  duration?: number
}

export interface LiveTranscriptChunk {
  id: string
  text: string
  confidence: number
  timestamp: number
  isFinal: boolean
}

const mockPhrases = [
  { text: "Hello, how are you?", glosses: ["HELLO", "HOW", "YOU"] },
  { text: "My name is...", glosses: ["MY", "NAME", "FINGERSPELL"] },
  { text: "Nice to meet you", glosses: ["NICE", "MEET", "YOU"] },
  { text: "Thank you very much", glosses: ["THANK", "YOU", "VERY-MUCH"] },
  { text: "I understand", glosses: ["I", "UNDERSTAND"] },
  { text: "Please repeat that", glosses: ["PLEASE", "REPEAT", "THAT"] },
  { text: "Good morning", glosses: ["GOOD", "MORNING"] },
  { text: "See you later", glosses: ["SEE", "YOU", "LATER"] },
]

const mockMotionCues = [
  "Forward movement detected",
  "Circular motion pattern",
  "Repeated gesture",
  "Two-handed symmetric sign",
]

const mockFacialExpressions = [
  "Raised eyebrows (question)",
  "Neutral expression",
  "Nodding motion",
  "Eye contact maintained",
]

// Process uploaded/recorded video
export async function processSignVideo(
  videoBlob: Blob,
  onProgress?: (progress: number) => void
): Promise<TranslationResult> {
  // Simulate processing stages
  const stages = [10, 25, 40, 60, 75, 90, 100]
  
  for (const progress of stages) {
    await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300))
    onProgress?.(progress)
  }

  const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)]
  
  return {
    id: 'result_' + Date.now(),
    text: randomPhrase.text,
    confidence: 0.75 + Math.random() * 0.2,
    glosses: randomPhrase.glosses,
    motionCues: mockMotionCues.slice(0, 2 + Math.floor(Math.random() * 2)),
    facialExpressions: mockFacialExpressions.slice(0, 1 + Math.floor(Math.random() * 2)),
    timestamp: new Date().toISOString(),
    duration: Math.floor(videoBlob.size / 10000),
  }
}

// Live streaming translation
export function createLiveTranslationStream(
  onChunk: (chunk: LiveTranscriptChunk) => void,
  onError?: (error: Error) => void
) {
  let isRunning = false
  let intervalId: NodeJS.Timeout | null = null
  let chunkCounter = 0

  const words = [
    "Hello", "I", "am", "signing", "to", "you",
    "This", "is", "a", "live", "translation",
    "Thank", "you", "for", "watching",
    "Nice", "to", "meet", "you",
  ]

  const start = () => {
    if (isRunning) return
    isRunning = true
    
    intervalId = setInterval(() => {
      if (!isRunning) return
      
      const isFinal = Math.random() > 0.7
      const wordCount = isFinal ? 2 + Math.floor(Math.random() * 3) : 1
      const startIdx = Math.floor(Math.random() * (words.length - wordCount))
      const text = words.slice(startIdx, startIdx + wordCount).join(' ')
      
      onChunk({
        id: 'chunk_' + chunkCounter++,
        text,
        confidence: 0.6 + Math.random() * 0.35,
        timestamp: Date.now(),
        isFinal,
      })
    }, 1500 + Math.random() * 1000)
  }

  const stop = () => {
    isRunning = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const pause = () => {
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  const resume = () => {
    if (isRunning && !intervalId) {
      start()
    }
  }

  return { start, stop, pause, resume, isRunning: () => isRunning }
}
