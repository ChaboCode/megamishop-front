import Head from 'next/head'
import Image from 'next/image';

import Header from './components/Header'
import MainBanner from './components/HomeBanner'

export default function Home() {
  return (
      <>
          <Head>
              <title>MonaShop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
        <MainBanner />
    </>
  )
}
