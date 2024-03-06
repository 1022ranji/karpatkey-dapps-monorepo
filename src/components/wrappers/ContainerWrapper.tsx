import { Container, ContainerProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledContainer = styled(Container)(() => ({
  maxWidth: 902,
  position: 'relative',
  margin: '0 auto',
  zIndex: 10,
  paddingLeft: 20,
  paddingRight: 20
}))

export const ContainerWrapper: FC<ContainerProps> = (props) => (
  <StyledContainer maxWidth={false} {...props} />
)
