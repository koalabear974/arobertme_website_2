import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

const BASE_URL = 'https://arobert.me'
const TITLE = 'Adrien Robert — Senior Front-End Engineer'
const DESCRIPTION =
  'Senior front-end engineer based in Berlin with 12 years of experience. Building product interfaces for greentech, AI tooling, and the open web. React, TypeScript, Next.js.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Adrien Robert', url: BASE_URL }],
  keywords: ['front-end engineer', 'React', 'TypeScript', 'Next.js', 'Berlin', 'generative art', 'AI tooling'],
  creator: 'Adrien Robert',

  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Adrien Robert',
    title: TITLE,
    description: DESCRIPTION,
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@koalabear974',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
