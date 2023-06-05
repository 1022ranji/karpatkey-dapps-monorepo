import { Box, styled } from '@mui/material'
import { FC } from 'react'

const BoxWrapper = styled(Box)(() => ({
  flex: 'auto'
}))

const Content: FC<ComponentProps> = ({ children }) => <BoxWrapper>{children}</BoxWrapper>
export default Content
