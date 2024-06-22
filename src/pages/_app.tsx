import { Layout } from '@@/components/Layout/Layout'
import '../assets/globals.css'
import type { AppProps } from 'next/app'

export default function MyApp({
  Component,
  pageProps
}: {
  Component: React.FC
  pageProps: AppProps
}) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
