import Head from 'next/head'

interface HeadParams {
    title?: string
}

export default function MegamiHead({ title }: HeadParams) {
    return (
        <Head>
            <title>{title + " | MegamiShop"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}
