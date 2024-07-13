import { BannerManager } from '@@/components/Banner/BannerManager'
import { BannerViewer } from '@@/components/Banner/BannerViewer'
import { Footer } from '../src/components/Footer/Footer'
import { MainNav } from '../src/components/MainNav/MainNav'
import '../public/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'

// ts-unused-exports:disable-next-line
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* TODO: Check this doesn't mess up server */}
        <BannerManager>
          <main>
            <BannerViewer />
            <MainNav />
            {children}
            <Footer />
          </main>
        </BannerManager>
      </body>
    </html>
  )
}
