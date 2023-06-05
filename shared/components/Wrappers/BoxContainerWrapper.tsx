import { Box, BoxProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  margin: '0 auto',
  zIndex: 10,
  width: '100%'
}))

const BoxContainerWrapper: FC<BoxProps> = (props) => <StyledBox {...props} />

export default BoxContainerWrapper
