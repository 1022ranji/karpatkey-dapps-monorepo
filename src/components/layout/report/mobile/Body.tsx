import { styled } from '@mui/material/styles'
import { BoxWrapperColumn } from 'src/components'
import { HEADER_HEIGHT } from 'components/layout/report/mobile/Header'

export const Body = styled(BoxWrapperColumn)(() => ({
  alignItems: 'center',
  flexGrow: 1,
  zIndex: 1,
  justifyContent: 'space-between',
  paddingTop: HEADER_HEIGHT
}))
