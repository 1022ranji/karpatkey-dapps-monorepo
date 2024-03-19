import React from 'react'
import { Box, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { AnimatePresenceWrapper, BoxWrapperColumn, PNG as Logo } from 'src/components'
import { Modal, StyledBackdrop, ModalContent, LinkStyled, Wrapper } from '../Common'

export const HEADER_HEIGHT = 80

export const Header = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    // handle open but close if already open
    setOpen(!open)
  }
  const handleClose = () => setOpen(false)

  return (
    <AnimatePresenceWrapper>
      <Wrapper height={HEADER_HEIGHT} sxNavBar={{ maxWidth: '940px' }}>
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
          <LinkStyled href="https://www.karpatkey.com/contributions">Contributions</LinkStyled>
          <LinkStyled sx={{ fontWeight: 700, opacity: 100 }} href="https://reports.karpatkey.com/">
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
      </Wrapper>
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
