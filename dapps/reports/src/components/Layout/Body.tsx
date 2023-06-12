import { Box } from '@mui/material'
import React, { ReactElement } from 'react'

interface BodyProps {
  children: React.ReactElement
}

const Body = (props: BodyProps): ReactElement => {
  return (
    <Box component="main" sx={{ width: '100%' }}>
      {props.children}
    </Box>
  )
}

export default Body
