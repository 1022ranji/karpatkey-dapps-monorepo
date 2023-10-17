import { Box } from '@mui/material'
import React from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'

const LogoKarpatkey = () => {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onClick = (e: any) => {
    const url = 'https://www.karpatkey.com/'
    if (e.ctrlKey || e.metaKey) {
      //if ctrl key or command is pressed
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
      sx={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <NextImage alt="logo" src="/images/logos/logo2.png" width={102} height={21} />
    </Box>
  )
}

export default LogoKarpatkey
