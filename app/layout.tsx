import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adrien Robert — Senior Front-End Engineer',
  description: 'Senior front-end engineer based in Berlin. Building for greentech, AI tooling, and the open web.',
  openGraph: {
    title: 'Adrien Robert — Senior Front-End Engineer',
    description: 'Senior front-end engineer based in Berlin.',
    url: 'https://arobert.me',
    siteName: 'Adrien Robert',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
