import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import CustomTypography from './CustomTypography'

const Logo = () => (
  <Box component={Link} href="/" alignItems="center" display="flex" sx={{ textDecoration: 'none' }}>
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Mono',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24px',
        lineHeight: '30px',
        textAlign: 'center',
        color: '#1A1A1A'
      }}
    >
      karpatkey
    </CustomTypography>
  </Box>
)

export default Logo
