import React from 'react'
import { styled, Box, Link, css, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import clsx from 'clsx'
import { Modal as BaseModal } from '@mui/base/Modal'
import { AnimatePresenceWrapper, BoxWrapperColumn, PNG as Logo } from 'src/components'

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

const Backdrop = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
  (props, ref) => {
    const { open, className, ...other } = props
    return <div className={clsx({ 'base-Backdrop-open': open }, className)} ref={ref} {...other} />
  }
)

Backdrop.displayName = 'Backdrop'

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 50;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
`

const ModalContent = styled('div')(
  ({ theme }) => css`
    text-align: start;
    background-color: ${theme.palette.background.default};
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    padding: 24px;
  `
)

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
              </BoxWrapperColumn>
            </Box>
          </ModalContent>
        </Slide>
      </Modal>
    </AnimatePresenceWrapper>
  )
}
