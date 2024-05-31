// import { DefaultSeo, NextSeo } from 'next-seo'
import { Html, Head, Main, NextScript } from 'next/document'
// import Script from 'next/script'
import React from 'react'
export default function Document() {
  return (
    <Html>
      <Head >
      <meta name="google-site-verification" content="cYMMDuzfogwvmr_cqYn5IUwI0b8-oLz3j2wDSiiCdLg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}