import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import { HEADER_HEIGHT } from 'components/layout/report/mobile/Header'

export const ReportDesktopBodyWrapper = styled(Box)(() => ({
  display: `flex`,
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  borderTop: '1px solid rgba(0, 0, 0, 0.12)'
}))
