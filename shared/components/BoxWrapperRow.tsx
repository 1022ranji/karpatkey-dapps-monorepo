import { Box, BoxProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}))

const BoxWrapperRow: FC<BoxProps> = (props) => <StyledBox {...props} />

export default BoxWrapperRow
