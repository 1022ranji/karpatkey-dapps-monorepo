import React from 'react'
import { styled, Box, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AnimatePresenceWrapper, BoxWrapperColumn, PNG as Logo } from 'src/components'
import { Modal, StyledBackdrop, ModalContent, LinkStyled } from '../Common'

const NavbarLogoLeftContainer = styled(Box)(() => ({
  justifyContent: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  zIndex: 1302
}))

const NavbarLeft = styled(Box)(() => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  position: 'sticky',
  top: '0',
  zIndex: 1301,
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '20px 20px',
  backgroundColor: '#eeeded',
  '&.hide': {
    position: 'fixed',
    top: '-80px',
    transition: '0.3s linear',
    zIndex: 1301
  },
  '&.show , &.down': {
    position: 'fixed',
    top: '0px',
    transition: '0.3s linear',
    zIndex: 1301
  }
}))

const Container = styled(Box)(() => ({
  display: 'block',
  position: 'static',
  backgroundColor: 'transparent',
  marginLeft: 'auto',
  marginRight: 'auto'
}))

const NavbarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

export const Header = () => {
  const [show, setShow] = React.useState(true)
  const [lastScrollY, setLastScrollY] = React.useState(0)

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // if scroll down hide the navbar
      setShow(false)
    } else {
      // if scroll up show the navbar
      setShow(true)
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', controlNavbar)

    // cleanup function
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    // handle open but close if already open
    setOpen(!open)
  }
  const handleClose = () => setOpen(false)

  return (
    <AnimatePresenceWrapper>
      <NavbarLogoLeftContainer>
        <NavbarLeft
          className={`header ${show ? 'show' : 'hide'}`}
          sx={{ width: '100%', colorBackground: 'background.default' }}
        >
          <Container
            sx={{ height: { xs: '48px', md: '30px' }, width: { xs: '728px', md: '940px' } }}
          >
            <NavbarWrapper>
              <Logo />
              <Box
                sx={{
                  gridColumnGap: '30px',
                  gridRowGap: '30px',
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                  display: {
                    xs: 'none',
                    md: 'flex'
                  },
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

              <IconButton
                edge="end"
                color="inherit"
                aria-label="open drawer"
                onClick={handleOpen}
                sx={{
                  justifyContent: 'center',
                  display: {
                    xs: 'flex',
                    md: 'none'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </NavbarWrapper>
          </Container>
        </NavbarLeft>
      </NavbarLogoLeftContainer>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <ModalContent sx={{ width: '100%', height: '100%', top: '88px' }}>
            <Box sx={{ p: 2 }}>
              <BoxWrapperColumn sx={{ mb: 2 }} gap={4}>
                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled href="https://www.karpatkey.com/contributions">
                    Contributions
                  </LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled
                    sx={{ fontWeight: 700, opacity: 100 }}
                    href="https://reports.karpatkey.com/"
                  >
                    Reports
                  </LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled href="https://www.karpatkey.com/writing">Writing</LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled href="https://www.karpatkey.com/jobs">Jobs</LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled href="https://www.karpatkey.com/contact">Contact</LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled>Funds and results by position</LinkStyled>
                </ListItemButton>

                <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                  <LinkStyled>Token detail</LinkStyled>
                </ListItemButton>
              </BoxWrapperColumn>
            </Box>
          </ModalContent>
        </Slide>
      </Modal>
    </AnimatePresenceWrapper>
  )
}
