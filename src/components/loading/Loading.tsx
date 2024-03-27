import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { HEADER_HEIGHT } from '../layout/report/mobile/Header'
import { BoxWrapperColumn } from '../wrappers/BoxWrapperColumn'

export const Loading = () => {
  return (
    <BoxWrapperColumn
      sx={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px - 100px)`,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress color="primary" />
    </BoxWrapperColumn>
  )
}
