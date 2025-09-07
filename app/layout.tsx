import { GoogleAnalytics } from '@next/third-parties/google'
import { Footer } from '../src/components/Footer/Footer'
import { MainNav } from '../src/components/MainNav/MainNav'
import '../public/globals.css'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { MemoryMonitorWrapper } from './components/MemoryMonitorWrapper'
import { setupPeriodicMemoryCleanup } from './utils/memoryLeak'

// Setup periodic memory cleanup in production
if (process.env.NODE_ENV === 'production') {
  setupPeriodicMemoryCleanup()
}

// ts-unused-exports:disable-next-line
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <script
          type="application/json"
          id="dialogue-foundry-config"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              chatConfig: {
                apiBaseUrl:
                  'https://dialogue-foundry-backend-v2-test.onrender.com/api',
                companyId: 'premier-care-homes'
              },
              logoUrl: 'https://premier-care-homes.s3.amazonaws.com/assets/other/premier-care-homes-logo1.png',
              popupMessage: 'Have questions? Click here for help!',
              welcomeMessage: "Welcome to Premier Care Homes!\n\nHave a question about our services, locations, or how to get your loved one started? Just type it here and I'll help out!\n\nNot sure what to ask? Click one of the quick topics below to get started.",
              suggestions: [
                {
                  prompt: 'What neighborhoods are Premier Care Homes\' facilities located in?'
                },
                {
                  prompt: 'What services does Premier Care Homes offer?'
                },
                {
                  prompt: 'How can I get in contact?'
                },
                {
                  prompt: 'How can I apply for a job?'
                }
              ],
              styles: {
                primaryColor: '#779D7F',
                fontFamily: 'Avenir, Helvetica, Arial, sans-serif'
              }
            })
          }}
        />
        <script
          type="module"
          async
          src="https://djwdzs5n3r4m2.cloudfront.net/0.4/index.js"
        ></script>
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
