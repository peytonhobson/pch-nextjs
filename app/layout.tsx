import { Footer } from '../src/components/Footer/Footer'
import { MainNav } from '../src/components/MainNav/MainNav'
import '../public/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

// ts-unused-exports:disable-next-line
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <MainNav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
