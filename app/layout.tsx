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
  title: 'HandsTalk - Plataforma de Traducción y Aprendizaje de Lengua de Señas',
  description: 'Rompe las barreras de comunicación con traducción de lengua de señas impulsada por IA y aprendizaje interactivo. Traduce señas a texto, genera videos en lengua de señas y aprende a tu propio ritmo.',
  keywords: ['lengua de señas', 'LSM', 'traducción', 'aprendizaje', 'accesibilidad', 'sordo', 'hipoacúsico'],
  authors: [{ name: 'HandsTalk Team' }],
  openGraph: {
    title: 'HandsTalk - Traducción y Aprendizaje de Lengua de Señas',
    description: 'Plataforma de lengua de señas impulsada por IA para traducción y aprendizaje',
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
    <html lang="es">
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
