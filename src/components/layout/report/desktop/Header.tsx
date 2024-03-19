import React from 'react'
import { PNG as Logo, BoxWrapperColumn } from 'components/index'
import { Box, IconButton, ListItemButton, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { isYearAndMonthValid } from '../../../../utils/params'
import { Section } from 'components/layout/report/desktop/Sidebar'
import { slugify } from '../../../../utils'
import { useRouter } from 'next/router'
import { AnimatePresenceWrapper } from 'components/index'
import { Modal, StyledBackdrop, ModalContent, LinkStyled, Wrapper } from '../../Common'
import { Menu } from 'components/filters/Menu'

export const HEADER_HEIGHT = 88

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
      <Wrapper>
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
    </AnimatePresenceWrapper>
  )
}
