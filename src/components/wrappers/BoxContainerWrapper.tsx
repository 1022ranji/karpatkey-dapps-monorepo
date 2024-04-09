import { Box, BoxProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  width: '100%'
}))

export const BoxContainerWrapper: FC<BoxProps> = (props) => <StyledBox {...props} />
