import React from 'react'
import { PNG as Logo, BoxWrapperColumn, BoxWrapperRow } from 'src/components'
import { Box, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { isYearAndMonthValid } from '../../../../utils/params'
import { Section } from 'components/layout/report/desktop/Sidebar'
import { slugify } from 'src/utils'
import { useRouter } from 'next/router'
import { AnimatePresenceWrapper } from 'src/components'
import { Modal, StyledBackdrop, ModalContent, LinkStyled, Wrapper } from '../../Common'
import { Menu } from 'src/components/filters/mobile/Menu'

export const HEADER_HEIGHT = 160

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
    <AnimatePresenceWrapper>
      <Wrapper
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        height={HEADER_HEIGHT}
        sxNavBar={{ padding: '20px 0 0 0', maxWidth: '940px', width: '100%' }}
      >
        <BoxWrapperColumn sx={{ height: '100%', width: '100%' }}>
          <BoxWrapperRow
            sx={{
              paddingRight: '20px',
              paddingLeft: '20px',
              height: '40px',
              justifyContent: 'space-between',
              alignItems: 'none'
            }}
          >
            <Logo />
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
          </BoxWrapperRow>
          {!open && <Menu />}
        </BoxWrapperColumn>
      </Wrapper>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <ModalContent sx={{ width: '100%', height: '100%', top: '120px' }}>
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
                <Box
                  onClick={() => {
                    router.push('/').catch((e) => {
                      // workaround for https://github.com/vercel/next.js/issues/37362
                      if (!e.cancelled) {
                        throw e
                      }
                    })
                    setOpen(false)
                  }}
                  key={'Reports home'}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <ListItemButton sx={{ paddingLeft: '0px', justifyContent: 'center' }}>
                    <LinkStyled>Reports home</LinkStyled>
                  </ListItemButton>
                </Box>
              </BoxWrapperColumn>
            </Box>
          </ModalContent>
        </Slide>
      </Modal>
    </AnimatePresenceWrapper>
  )
}
