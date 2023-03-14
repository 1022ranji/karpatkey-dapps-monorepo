import { ContainerProps, styled } from '@mui/material'
import { FC } from 'react'

const StyledLayout = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
  minHeight: 0
}))

const LayoutWrapper: FC<ContainerProps> = (props) => <StyledLayout {...props} />

export default LayoutWrapper
