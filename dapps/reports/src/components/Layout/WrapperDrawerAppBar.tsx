import Filters from '@karpatkey-monorepo/reports/src/components/Filters/Menu'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import Logo from '@karpatkey-monorepo/shared/components/Logo'
import { slugify } from '@karpatkey-monorepo/shared/utils'
import CircleIcon from '@mui/icons-material/Circle'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  Toolbar
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const DRAWER_WIDTH = 290
const HEADER_HEIGHT = 100

type Section =
  | 'Summary'
  | 'Balance overview'
  | 'Treasury variation'
  | 'Farming funds'
  | 'Token details'

const SECTIONS: Section[] = [
  'Summary',
  'Balance overview',
  'Treasury variation',
  'Farming funds',
  'Token details'
]

const ListItemTextCustom = styled(ListItemText)<ListItemTextProps>(() => ({
  '& .MuiListItemText-primary': {
    width: 'calc(100% + 1px)'
  }
}))

const HeaderWrapper = styled(Box)(({ theme }: any) => ({
  display: 'flex',
  backgroundColor: theme.palette.background.default
}))

interface WrapperDrawerAppBarProps {
  window?: () => Window
  children: React.ReactElement
}

const WrapperDrawerAppBar = (props: WrapperDrawerAppBarProps): ReactElement => {
  const router = useRouter()
  const [, hash = 'summary'] = router.asPath.split('#')

  const drawer = (
    <Box sx={{ padding: '10px 10px' }}>
      <List>
        {SECTIONS.map((text: Section, index: number) => {
          const isActive = hash === slugify(text)
          return (
            <Link
              href={`#${slugify(text)}`}
              key={index}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem key={text}>
                <ListItemButton sx={{ padding: '0 0' }} disableTouchRipple>
                  <ListItemIcon sx={{ justifyContent: 'flex-start', minWidth: '40px' }}>
                    {isActive ? (
                      <CircleIcon sx={{ color: 'custom.black.primary' }} />
                    ) : (
                      <CircleOutlinedIcon sx={{ color: 'custom.grey.secondary' }} />
                    )}
                  </ListItemIcon>
                  <ListItemTextCustom
                    primary={text}
                    title={text}
                    sx={{
                      '& .MuiListItemText-primary': {
                        color: isActive ? 'custom.black.primary' : 'custom.grey.secondary',
                        fontWeight: isActive ? 700 : 600
                      }
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          )
        })}
      </List>
    </Box>
  )

  return (
    <HeaderWrapper>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'background.default',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            marginX: '56px',
            height: HEADER_HEIGHT
          }}
        >
          <BoxWrapperRow sx={{ width: '100%', justifyContent: 'space-between' }}>
            <Logo />
            <Filters />
          </BoxWrapperRow>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH }
        }}
      >
        <Toolbar sx={{ height: HEADER_HEIGHT }} />
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ height: HEADER_HEIGHT }} />
        {props.children}
      </Box>
    </HeaderWrapper>
  )
}

export default WrapperDrawerAppBar
