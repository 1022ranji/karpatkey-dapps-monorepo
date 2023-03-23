import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import CustomTypography from './CustomTypography'

const Logo = () => (
  <Box component={Link} href="/" alignItems="center" display="flex" sx={{ textDecoration: 'none' }}>
    <CustomTypography
      sx={{
        fontFamily: 'IBM Plex Sans',
        fontStyle: 'normal',
        fontWeight: 700,
        fontSize: '20px',
        lineHeight: '26px',
        textAlign: 'center',
        color: '#1A1A1A'
      }}
    >
      Karpatkey
    </CustomTypography>
  </Box>
)

export default Logo
