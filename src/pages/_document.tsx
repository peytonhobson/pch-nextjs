import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

// eslint-disable-next-line @typescript-eslint/no-shadow
export default function Document(req) {
  // const pathname = req.__NEXT_DATA__.page

  return (
    <Html lang="en-US" dir="ltr">
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon-16x16.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />

        {/*
            <Script
                    strategy="beforeInteractive"
                    id="myjs-file"
                    src="/assets/js/xxxx.js"
                ></Script>
            */}

        {/* Global variables can be used anywhere (plugins, subpages, etc.) */}
        <Script
          id="global-vars"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
                window['NODE_ENV'] = '${process.env.NODE_ENV}';
                `
          }}
        />
      </body>
    </Html>
  )
}
