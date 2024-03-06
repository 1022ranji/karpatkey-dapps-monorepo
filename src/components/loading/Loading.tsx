import CircularProgress from '@mui/material/CircularProgress'
import * as React from 'react'
import { FOOTER_HEIGHT } from '../layout/report/Footer'
import { HEADER_HEIGHT } from '../layout/report/Header'
import { BoxWrapperColumn } from '../wrappers/BoxWrapperColumn'

export const Loading = () => {
  return (
    <BoxWrapperColumn
      sx={{
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress color="primary" />
    </BoxWrapperColumn>
  )
}
