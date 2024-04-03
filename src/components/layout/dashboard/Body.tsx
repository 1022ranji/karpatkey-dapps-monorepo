import { styled } from '@mui/material/styles'
import { BoxWrapperColumn } from 'src/components'

export const Body = styled(BoxWrapperColumn)(() => ({
  alignItems: 'center',
  flexGrow: 1,
  zIndex: 1,
  justifyContent: 'space-between',
  maxWidth: '940px',
  marginLeft: 'auto',
  marginRight: 'auto'
}))
