import { GoogleAnalytics } from '@next/third-parties/google'
import { Footer } from '../src/components/Footer/Footer'
import { MainNav } from '../src/components/MainNav/MainNav'
import '../public/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { MemoryMonitorWrapper } from './components/MemoryMonitorWrapper'

// ts-unused-exports:disable-next-line
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
      </head>
      <body>
        <main>
          <MainNav />
          {children}
          <Footer />
          <MemoryMonitorWrapper />
        </main>
      </body>
      <GoogleAnalytics gaId="G-ET3W75J93L" />
    </html>
  )
}
