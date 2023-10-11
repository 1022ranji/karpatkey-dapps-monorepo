import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import { LogoKarpatkey } from '../../LogoKarpatkey'
import React from 'react'
import { styled, Box, Link } from '@mui/material'
import { useScrollDirection } from '@karpatkey-monorepo/reports/src/hooks/useScrollDirection'
import useMediaQuery from '@mui/material/useMediaQuery'

const NavbarLogoLeftContainer = styled(Box)(() => ({
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  zIndex: 2
}))

const NavbarLeft = styled(Box)(() => ({
  width: '100%',
  maxWidth: '1140px',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'IBM Plex Sans, sans-serif',
  display: 'flex',
  position: 'sticky',
  top: '0',
  zIndex: '5',
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px 20px',
  backgroundColor: '#eeeded',
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDuration: '500ms',
  '&.hide': {
    transform: 'translateY(-100%)'
  },
  '&.show , &.down': {
    transform: 'translateY(0)'
  }
}))

const Container = styled(Box)(() => ({
  display: 'block',
  position: 'static',
  backgroundColor: 'transparent',
  marginLeft: 'auto',
  marginRight: 'auto',
  height: '30px',
  width: '100%',
  maxWidth: '940px',
  fontFamily: 'IBM Plex Sans, sans-serif'
}))

const NavbarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  fontFamily: 'IBM Plex Sans, sans-serif'
}))

const LinkStyled = styled(Link)(() => ({
  opacity: '.7',
  color: '#1a1b1f',
  letterSpacing: '.25px',
  marginLeft: '5px',
  marginRight: '5px',
  padding: '5px 10px',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '16px',
  fontWeight: '600 !important',
  lineHeight: '20px',
  textDecoration: 'none',
  '&:hover': {
    color: 'rgba(26, 27, 31, 0.6)'
  }
}))

export const Header = () => {
  const scrollDirection = useScrollDirection()

  const matchesQuery = useMediaQuery('(min-width:710px)')

  return (
    <AnimatePresenceWrapper>
      <NavbarLogoLeftContainer>
        <NavbarLeft className={`header ${scrollDirection === 'down' ? 'hide' : 'show'}`}>
          <Container>
            <NavbarWrapper>
              <LogoKarpatkey />
              {matchesQuery ? (
                <Box
                  sx={{
                    gridColumnGap: '30px',
                    gridRowGap: '30px',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    display: 'flex',
                    position: 'relative',
                    float: 'right'
                  }}
                >
                  <LinkStyled href="https://www.karpatkey.com/contributions">
                    Contributions
                  </LinkStyled>
                  <LinkStyled
                    sx={{ fontWeight: 700, opacity: 100 }}
                    href="https://reports.karpatkey.com/"
                  >
                    Reports
                  </LinkStyled>
                  <LinkStyled href="https://www.karpatkey.com/writing">Writing</LinkStyled>
                  <LinkStyled href="https://www.karpatkey.com/jobs">Jobs</LinkStyled>
                  <LinkStyled href="https://www.karpatkey.com/contact">Contact</LinkStyled>
                </Box>
              ) : null}
            </NavbarWrapper>
          </Container>
        </NavbarLeft>
      </NavbarLogoLeftContainer>
    </AnimatePresenceWrapper>
  )
}
