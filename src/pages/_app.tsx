import { CacheProvider, EmotionCache } from '@emotion/react'
import { Layout } from 'src/components/layout/Layout'
import { ErrorBoundaryWrapper } from 'src/components'
import { TITLE } from 'src/config/constants'
import { createEmotionCache } from 'src/config/createEmotionCache'
import theme from 'src/config/theme'
import { CssBaseline, NoSsr } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import { Loading } from 'src/components'
import { AppProvider } from 'src/contexts/app.context'
import * as React from 'react'

import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()
  const isPasswordProtected = router.asPath.includes('/password-protect')

  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    const start = () => {
      console.log('start')
      setLoading(true)
    }
    const end = () => {
      console.log('finished')
      setLoading(false)
    }
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{TITLE}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <ErrorBoundaryWrapper>
          <AppProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <NoSsr>
              {isPasswordProtected ? <Component {...pageProps} /> : null}
              {!isPasswordProtected ? (
                <Layout>{loading ? <Loading /> : <Component {...pageProps} />}</Layout>
              ) : null}
            </NoSsr>
          </AppProvider>
        </ErrorBoundaryWrapper>
      </ThemeProvider>
    </CacheProvider>
  )
}
