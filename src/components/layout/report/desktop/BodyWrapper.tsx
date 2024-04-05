import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

export const ReportDesktopBodyWrapper = styled(Box)(() => ({
  display: `flex`,
  height: `100%`,
  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  overflowY: 'hidden'
}))
