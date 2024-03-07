import React from 'react'
import { styled } from '@mui/material/styles'
import { Menu, BoxWrapperRow, AnimatePresenceWrapper, PNG as Logo } from 'src/components'

export const HEADER_HEIGHT = 100

export const StyledHeader = styled(BoxWrapperRow)(() => ({
  height: HEADER_HEIGHT,
  flex: `0 0 ${HEADER_HEIGHT}px` /* flex-grow, flex-shrink, flex-basis */,
  backgroundColor: 'background.default',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  justifyContent: 'space-between',
  paddingRight: '26px',
  paddingLeft: '26px',
  width: '100%'
}))

export const Header = () => {
  return (
    <StyledHeader>
      <AnimatePresenceWrapper>
        <Logo />
      </AnimatePresenceWrapper>
      <Menu />
    </StyledHeader>
  )
}
