// Service for managing saved translations
// Uses localStorage for demo, would use a database in production

import type { TranslationResult } from './sign-to-text'
import type { SignVideoResult } from './text-to-sign'

const SIGN_TO_TEXT_KEY = 'handstalk_saved_sign_to_text'
const TEXT_TO_SIGN_KEY = 'handstalk_saved_text_to_sign'

export interface SavedSignToText extends TranslationResult {
  videoThumbnail?: string
}

export interface SavedTextToSign extends SignVideoResult {}

// Sign to Text saved items
export function getSavedSignToText(): SavedSignToText[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(SIGN_TO_TEXT_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveSignToTextResult(result: SavedSignToText): void {
  const saved = getSavedSignToText()
  const exists = saved.find(s => s.id === result.id)
  if (!exists) {
    saved.unshift(result)
    localStorage.setItem(SIGN_TO_TEXT_KEY, JSON.stringify(saved.slice(0, 50)))
  }
}

export function removeSignToTextResult(id: string): void {
  const saved = getSavedSignToText().filter(s => s.id !== id)
  localStorage.setItem(SIGN_TO_TEXT_KEY, JSON.stringify(saved))
}

// Text to Sign saved items
export function getSavedTextToSign(): SavedTextToSign[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(TEXT_TO_SIGN_KEY)
  return stored ? JSON.parse(stored) : []
}

export function saveTextToSignResult(result: SavedTextToSign): void {
  const saved = getSavedTextToSign()
  const exists = saved.find(s => s.id === result.id)
  if (!exists) {
    saved.unshift(result)
    localStorage.setItem(TEXT_TO_SIGN_KEY, JSON.stringify(saved.slice(0, 50)))
  }
}

export function removeTextToSignResult(id: string): void {
  const saved = getSavedTextToSign().filter(s => s.id !== id)
  localStorage.setItem(TEXT_TO_SIGN_KEY, JSON.stringify(saved))
}

// Clear all saved
export function clearAllSaved(): void {
  localStorage.removeItem(SIGN_TO_TEXT_KEY)
  localStorage.removeItem(TEXT_TO_SIGN_KEY)
}
