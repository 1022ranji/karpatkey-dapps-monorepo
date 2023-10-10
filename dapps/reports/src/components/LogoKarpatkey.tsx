import { Box } from '@mui/material'
import React from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'

export const LogoKarpatkey = () => {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    const url = 'https://www.karpatkey.com/'
    // If ctrl key or command is pressed
    if (e.ctrlKey || e.metaKey) {
      window.open(url, '_blank')
    } else {
      router.push(url)
    }
  }

  return (
    <Box
      onClick={onClick}
      alignItems="center"
      display="flex"
      sx={{
        textDecoration: 'none',
        cursor: 'pointer',
        float: 'left',
        position: 'relative'
      }}
    >
      <NextImage alt="logo" src="/images/logos/logo2.png" width={102} height={21} />
    </Box>
  )
}
