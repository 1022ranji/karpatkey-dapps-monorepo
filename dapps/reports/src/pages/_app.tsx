import { CacheProvider, EmotionCache } from '@emotion/react'
import Layout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { TITLE } from '@karpatkey-monorepo/shared/config/constants'
import createEmotionCache from '@karpatkey-monorepo/shared/config/createEmotionCache'
import theme from '@karpatkey-monorepo/shared/config/theme'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import CssBaseline from '@mui/material/CssBaseline'
import NoSsr from '@mui/material/NoSsr'
import { ThemeProvider } from '@mui/material/styles'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

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
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <NoSsr>
          <CssBaseline />
          <Layout>
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
                sx={{ minHeight: 'calc(100vh - 160px)' }}
              >
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </NoSsr>
      </ThemeProvider>
    </CacheProvider>
  )
}
