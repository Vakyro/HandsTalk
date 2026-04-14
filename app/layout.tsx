import type { Metadata, Viewport } from 'next'
import { Inter, Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/lib/context/auth-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: '--font-nunito'
});

export const metadata: Metadata = {
  title: 'HandsTalk - Sign Language Translation & Learning Platform',
  description: 'Break communication barriers with AI-powered sign language translation and interactive learning. Translate sign to text, generate sign language videos, and learn at your own pace.',
  keywords: ['sign language', 'ASL', 'translation', 'learning', 'accessibility', 'deaf', 'hard of hearing'],
  authors: [{ name: 'HandsTalk Team' }],
  openGraph: {
    title: 'HandsTalk - Sign Language Translation & Learning',
    description: 'AI-powered sign language platform for translation and learning',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#8FB2FC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${nunito.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
