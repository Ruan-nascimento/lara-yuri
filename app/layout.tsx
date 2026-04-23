import localFont from 'next/font/local'
import { Montserrat } from 'next/font/google'
import './globals.css'

const minhaFonte = localFont({
  src: './fonts/Resolid.otf',
  display: 'swap',
  variable: '--font-minha-fonte',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${minhaFonte.variable} ${montserrat.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}