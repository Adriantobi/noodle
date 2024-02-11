import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import '../css/globals.css'
import { NextAuthProvider } from './Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Noodle Spaces',
  description: 'Virtual Study Spaces. With music, ambient sounds and more. Stay a while!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  )
}
