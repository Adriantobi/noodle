import '../../css/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NoodLe Spaces',
  description: 'Virtual Study Spaces. With music, ambient sounds and more. Stay a while!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="https://em-content.zobj.net/thumbs/160/apple/354/steaming-bowl_1f35c.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
