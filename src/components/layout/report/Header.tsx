import React from 'react'
import { styled } from '@mui/material/styles'
import { Menu, PNG as Logo, BoxWrapperColumn } from 'src/components'
import { Box, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Modal, StyledBackdrop, ModalContent, LinkStyled } from '../Common'
import { isYearAndMonthValid } from 'src/utils/params'
import { Section } from 'components/layout/report/Sidebar'
import { slugify } from 'src/utils'
import { useRouter } from 'next/router'
import { AnimatePresenceWrapper } from 'src/components'

export const HEADER_HEIGHT = 100

const NavbarLogoLeftContainer = styled(Box)(() => ({
  justifyContent: 'space-between',
  width: '100%',
  zIndex: 1302,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#eeeded',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
}))

const NavbarLeft = styled(Box)(() => ({
  zIndex: 1301,
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#eeeded',
  display: 'flex',
  alignItems: 'center',
  height: '100%'
}))

const Container = styled(Box)(() => ({
  backgroundColor: 'transparent',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%'
}))

const NavbarWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
}))

export const Header = () => {
  const router = useRouter()

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    // handle open but close if already open
    setOpen(!open)
  }
  const handleClose = () => setOpen(false)

  const isDDay = isYearAndMonthValid()
  const SECTIONS: Section[] = ['Summary', 'Balance overview', 'Treasury variation', 'Token detail']

  if (isDDay) {
    SECTIONS.splice(3, 0, 'Funds and results by position')
  } else {
    SECTIONS.splice(3, 0, 'Farming funds and results')
  }

  return (
    <>
      <NavbarLogoLeftContainer
        sx={{
          display: 'flex',
          paddingRight: {
            xs: '20px',
            md: '26px'
          },
          paddingLeft: {
            xs: '20px',
            md: '26px'
          },
          height: {
            xs: '80px',
            md: HEADER_HEIGHT
          },
          flex: {
            xs: `0 0 80px`,
            md: `0 0 ${HEADER_HEIGHT}px` /* flex-grow, flex-shrink, flex-basis */
          }
        }}
      >
        <NavbarLeft className={`header`} sx={{ width: '100%' }}>
          <Container>
            <AnimatePresenceWrapper>
              <NavbarWrapper>
                <Logo />
                <Menu />
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
            </AnimatePresenceWrapper>
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
                {SECTIONS.map((text: Section, index: number) => {
                  return (
                    <Box
                      onClick={() => {
                        router.push(`#${slugify(text)}`).catch((e) => {
                          // workaround for https://github.com/vercel/next.js/issues/37362
                          if (!e.cancelled) {
                            throw e
                          }
                        })
                        setOpen(false)
                      }}
                      key={index}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                        <LinkStyled>{text}</LinkStyled>
                      </ListItemButton>
                    </Box>
                  )
                })}
              </BoxWrapperColumn>
            </Box>
          </ModalContent>
        </Slide>
      </Modal>
    </>
  )
}
