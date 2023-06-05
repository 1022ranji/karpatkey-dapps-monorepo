import { CacheProvider, EmotionCache } from '@emotion/react'
import Layout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { FilterProvider } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import ErrorBoundaryWrapper from '@karpatkey-monorepo/shared/components/ErrorBoundary/ErrorBoundaryWrapper'
import { TITLE } from '@karpatkey-monorepo/shared/config/constants'
import createEmotionCache from '@karpatkey-monorepo/shared/config/createEmotionCache'
import theme from '@karpatkey-monorepo/shared/config/theme'
import { Box, CircularProgress, CssBaseline, NoSsr } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import * as React from 'react'

import '../styles/globals.css'

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <ErrorBoundaryWrapper>
            <FilterProvider>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <NoSsr>
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
            </FilterProvider>
          </ErrorBoundaryWrapper>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  )
}
