import { Box } from '@mui/material'
import React from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { LinkWrapper } from 'src/components'

export const PNG = () => {
  const router = useRouter()

  const KARPATKEY_URL = 'https://www.karpatkey.com/'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    // If ctrl key or command is pressed
    if (e.ctrlKey || e.metaKey) {
      window.open(KARPATKEY_URL, '_blank')
    } else {
      router.push(KARPATKEY_URL)
    }
  }

  return (
    <LinkWrapper url={KARPATKEY_URL}>
      <Box
        onClick={onClick}
        alignItems="center"
        sx={{
          textDecoration: 'none',
          cursor: 'pointer',
          float: 'left',
          position: 'relative'
        }}
      >
        <NextImage alt="logo" src="/images/logos/logo2.png" width={102} height={21} />
      </Box>
    </LinkWrapper>
  )
}
