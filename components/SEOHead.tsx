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
      <title>{title}</title>
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
    </Head>
  )
}

export default SEOHead
