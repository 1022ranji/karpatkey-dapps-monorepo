import { styled } from '@mui/material/styles'
import { BoxWrapperColumn } from 'components/wrappers'
import { HEADER_HEIGHT } from 'components/layout/report/desktop/Header'

export const Wrapper = styled(BoxWrapperColumn)(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  margin: '0',
  top: `${HEADER_HEIGHT}px`,
  position: 'relative'
}))
