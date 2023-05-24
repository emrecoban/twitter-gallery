import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter Gallery',
  description: 'You can see media files on your Twitter account.',
  keywords: ['Emre COBAN', 'twitter', 'twitter media'],
  creator: 'Emre COBAN',
  publisher: 'Emre COBAN',
  category: 'social media tool',
  openGraph: {
    title: 'Twitter Gallery',
    description: 'You can see media files on your Twitter account.',
    url: 'https://twittergallery.emre.run',
    siteName: 'twittergallery.emre.run',
    images: '/og-img.png',
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Gallery',
    description: 'You can see media files on your Twitter account.',
    creator: '@emreshepherd',
    images: {
      url: 'https://twittergallery.emre.run/og-img.png',
      alt: 'twittergallery OG IMG',
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
