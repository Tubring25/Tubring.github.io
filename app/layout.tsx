import { Inter } from 'next/font/google'
import ThemeProvider from './components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div >
            <main >{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
