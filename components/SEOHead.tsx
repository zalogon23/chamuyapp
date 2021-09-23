import React, { ReactElement } from 'react'
import Head from "next/head"

interface Props {
  description: string,
  keywords: string,
  title: string
}

function SEOHead({ title, keywords, description }: Props): ReactElement {
  return (
    <Head>
      <title>{`${title} | Chamuyapp`}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="favicon-16x16.png" sizes="16x16" />
    </Head>
  )
}

export default SEOHead
