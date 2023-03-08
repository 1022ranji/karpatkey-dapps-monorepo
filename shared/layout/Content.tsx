import { styled } from '@mui/material'
import { FC } from 'react'

const BoxWrapper = styled('div')(() => ({
  flex: 'auto',
  // Prevent footer from showing at top part of screen
  minHeight: 'calc(100vh - 160px)'
}))

const Content: FC<ComponentProps> = ({ children }) => <BoxWrapper>{children}</BoxWrapper>
export default Content
