import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import Logo from '@karpatkey-monorepo/shared/components/Logo'
import MenuAddress from '@karpatkey-monorepo/shared/components/MenuAddress'
import { DAO_NAME_DEFAULT } from '@karpatkey-monorepo/shared/config/constants'
import { existDAOKeyName } from '@karpatkey-monorepo/shared/utils'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemTextProps,
  Slide,
  Toolbar,
  useScrollTrigger
} from '@mui/material'
import { Theme, css, styled } from '@mui/material/styles'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactElement } from 'react'

const CommonCSS = (theme: Theme) => css`
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #1a1a1a;

  &:hover {
    color: rgba(26, 27, 31, 0.6);
  }
`

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>`
  ${({ theme }) => CommonCSS(theme)}
`

const LinkCustom = styled(Link)<LinkProps>`
  ${({ theme }) => CommonCSS(theme)}
`

interface IDrawerAppBarProps {
  window?: () => Window
}

interface INavItem {
  name: string
  path: string
}

const DRAWER_WIDTH = 240
const NAV_ITEMS: INavItem[] = [
  { name: 'Report', path: '/treasury/report' },
  { name: 'Other', path: '/treasury/other' }
]

const HeaderWrapper = styled('div')(({ theme }) => ({
  height: 64,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  zIndex: '999',
  flex: '0 0 auto',
  position: 'sticky',
  backgroundSize: 'cover'
}))

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

function HideOnScroll(props: Props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const DrawerAppBar: FC = (props: IDrawerAppBarProps): ReactElement => {
  const router = useRouter()

  const { daoName = DAO_NAME_DEFAULT } = router.query

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const [anchorEl] = React.useState<Maybe<HTMLElement>>(null)
  const open = Boolean(anchorEl)

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {NAV_ITEMS.map(({ name, path }: INavItem, index: number) => (
          <Link href={path} key={index} style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem>
              <ListItemButton sx={{ textAlign: 'left' }}>
                <ListItemTextCustom primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <HeaderWrapper>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: 'background.default',
            boxShadow: 'none',
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Toolbar
            sx={{
              justifyContent: 'space-between',
              gap: 2,
              maxWidth: '1284px',
              width: '100%',
              margin: '0 auto'
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'black', display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap={6}
              sx={{ width: '100%' }}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <Logo />
                <BoxWrapperRow sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  {NAV_ITEMS.map(({ name, path }: INavItem, index: number) => {
                    return (
                      <LinkCustom
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        href={path}
                        key={index}
                        sx={
                          path === router.pathname
                            ? {
                                opacity: 1,
                                color: '#1a1b1f',
                                fontWeight: 700,
                                '&:not(:last-child)': {
                                  marginRight: '52px'
                                }
                              }
                            : {
                                '&:not(:last-child)': {
                                  marginRight: '52px'
                                }
                              }
                        }
                      >
                        {name}
                      </LinkCustom>
                    )
                  })}
                  {daoName && existDAOKeyName(daoName as DAO_NAME) && (
                    <>
                      <Divider orientation="vertical" flexItem sx={{ marginRight: '52px' }} />
                      <MenuAddress daoName={daoName as DAO_NAME} />
                    </>
                  )}
                </BoxWrapperRow>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <Box component="nav">
        <Drawer
          anchor={'right'}
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </HeaderWrapper>
  )
}

export default DrawerAppBar
