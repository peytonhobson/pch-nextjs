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
              theme: 'light',
              title: 'Premier Care Homes',
              personaOptions: {
                assistant: {
                  name: 'Premier Care Homes Expert',
                  tagline: 'Ask me anything about Premier Care Homes'
                }
              },
              popupMessage: 'Have questions? Click here for help!',
              welcomeMessage: "Welcome to Premier Care Homes, where your comfort and care are our top priorities!\n\nDiscover our beautiful homes in Salem that are tailored for exceptional care.\n\nStart your journey with us today!",
              conversationStarters: [
                {
                  label: 'Locations',
                  prompt: 'What neighborhoods are Premier Care Homes facilities located in?'
                },
                {
                  label: 'Services',
                  prompt: 'What services does Premier Care Homes offer?'
                },
                {
                  label: 'Contact',
                  prompt: 'How can I get in contact with Premier Care Homes?'
                },
                {
                  label: 'Careers',
                  prompt: 'How can I apply for a job at Premier Care Homes?'
                }
              ]
            })
          }}
        />
        <script
          type="module"
          async
          src="https://djwdzs5n3r4m2.cloudfront.net/0.3/index.js"
        ></script>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                /* Core colors that can be customized by customers */
                --df-primary-color: #779D7F;
                --df-secondary-color: #f5f5f5;
                --df-tertiary-color: rgb(58 80 62);
                
                /* Background colors */
                --df-bg-primary: white;
                --df-bg-secondary: #d9d9d9;
                
                /* Text colors */
                --df-text-primary: rgba(31, 41, 55, 0.8);
                --df-text-secondary: oklch(0.746477 0.0216 264.436);
                --df-text-contrast: white;
                
                /* Alert/Exception colors */
                --df-alert-bg: #ffcccc;
                --df-alert-border: darkred;
                --df-alert-text: black;
                
                /* Border and outline */
                --df-border-color: rgba(31, 41, 55, 0.2);
                --df-focus-outline: transparent;
                
                /* Common transparency */
                --df-transparent: transparent;
                /* Need slightly darker gray for disabled text */
                --df-disabled: rgb(119, 157, 127, 0.5);

                --df-font-family: Avenir, Helvetica, Arial, sans-serif;
                /* --df-mono-font-family: monospace; */
                --df-font-size-base: 16px;

                --df-border-width: 0;
                --df-border-radius: 20px;
                --df-line-height: 1.5;
                --df-flex-gap: 12px;
              }

              .nlux-comp-composer>button:disabled>.nlux-comp-sendIcon>.nlux-comp-sendIcon-container {
                color: var(--df-disabled);
              }

              .nlux-comp-composer>button>.nlux-comp-sendIcon>.nlux-comp-sendIcon-container {
                color: var(--df-primary-color);
              }

              .nlux-comp-composer>button>.nlux-comp-sendIcon>.nlux-comp-sendIcon-container:hover {
                color: var(--df-tertiary-color);
              }

              .nlux-comp-cancelIcon-container {
                color: var(--df-primary-color);
              }

              .chat-window a {
                color: var(--df-primary-color);
                text-decoration: underline;
              }
            `
          }}
        />
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
