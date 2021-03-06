import "@fortawesome/fontawesome-free/css/all.min.css";
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import 'codemirror/lib/codemirror.css'
import '../components/Tree/node-render-default.css';

import React from 'react'
import type, {AppProps} from 'next/app'
import Head from 'next/head'
import {DefaultSeo} from 'next-seo'

import SEO from '../next-seo.config'
import {MessageProvider} from '../lib/message'
import {AuthProvider} from "../lib/auth";

function MyApp({Component, pageProps}: AppProps) {
    const pageMeta = (Component as any)?.defaultProps?.meta || {}
    const pageSEO = {...SEO, ...pageMeta}

    return (
        <React.Fragment>
            <Head>
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
            </Head>
            <DefaultSeo {...pageSEO} />
            <MessageProvider>
                <AuthProvider>
                    <Component {...pageProps} />
                </AuthProvider>
            </MessageProvider>
        </React.Fragment>
    )
}

export default MyApp
