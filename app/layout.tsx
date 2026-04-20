import type { Metadata } from 'next'
import { Bebas_Neue, Sora, Noto_Sans_KR, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
})
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['300', '400', '600', '700'],
})
const noto = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
  weight: ['300', '400', '700'],
})
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'AXENIOR — AI Transformation, Senior Expertise',
  description: '제조 현장의 AI 전환 전문 파트너. Manufacturing AX, Quality AX, Legacy AX.',
  openGraph: {
    title: 'AXENIOR',
    description: 'AI Transformation, Senior Expertise',
    url: 'https://axenior.kr',
    siteName: 'AXENIOR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${bebas.variable} ${sora.variable} ${noto.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
