import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import FormNetworkDropdown from '@karpatkey-monorepo/shared/components/FormItems/FormNetworkDropdown'
import Logo from '@karpatkey-monorepo/shared/components/Logo'
import MenuAddress from '@karpatkey-monorepo/shared/components/MenuAddress'
import {
  DAO_DEFAULT,
  NETWORK_DEFAULT,
  PERIOD_TYPE_DEFAULT
} from '@karpatkey-monorepo/shared/config/constants'
import { isDefaultAddress } from '@karpatkey-monorepo/shared/utils'
import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar
} from '@mui/material'
import { ListItemTextProps } from '@mui/material/ListItemText'
import { Theme, css, styled } from '@mui/material/styles'
import { DateTime } from 'luxon'
import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, ReactElement } from 'react'
import { useForm } from 'react-hook-form'

const CommonCSS = (theme: Theme) => css`
  margin-left: 5px;
  letter-spacing: 0.25px;
  text-decoration: none;
  font-family: ${theme.typography.fontFamily};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #1a1b1f;
  opacity: 0.7;

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
  { name: 'DAO treasury report', path: '/treasury/report' },
  { name: 'Other', path: '/treasury/other' }
]

const HeaderWrapper = styled('div')(({ theme }) => ({
  height: 64,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  zIndex: '999',
  flex: '0 0 auto',
  position: 'sticky',
  backgroundSize: 'cover',
  transition: 'top 0.4s ease-in-out',
  '&.visible': {
    top: 0
  },
  '&.hidden': {
    top: -100
  }
}))

const DrawerAppBar: FC = (props: IDrawerAppBarProps): ReactElement => {
  const router = useRouter()

  const {
    chainId = NETWORK_DEFAULT,
    daoAddress = DAO_DEFAULT,
    period = DateTime.now().toISODate(),
    periodType = PERIOD_TYPE_DEFAULT
  } = router.query

  const params = { chainId: +chainId, daoAddress, period, periodType } as TReportFilter

  const onChangeNetwork = (network: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...params, chainId: network }
    })
  }

  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const methods = useForm({ defaultValues: { network: chainId } })
  const { control } = methods

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
      <AppBar component="nav" sx={{ backgroundColor: 'background.default' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: 'black', display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <BoxWrapperRow>
            <BoxWrapperRow gap={6}>
              <Logo />
              <Box sx={{ display: { xs: 'none', sm: 'flex' } }} gap={2}>
                {NAV_ITEMS.map(({ name, path }: INavItem, index: number) => {
                  return (
                    <LinkCustom
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      href={path}
                      key={index}
                      sx={path === router.pathname ? { opacity: 1, fontWeight: 700 } : {}}
                    >
                      {name}
                    </LinkCustom>
                  )
                })}
              </Box>
            </BoxWrapperRow>
          </BoxWrapperRow>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            gap={4}
          >
            {daoAddress && !isDefaultAddress(daoAddress as string) && (
              <MenuAddress address={daoAddress as string} />
            )}
            <FormNetworkDropdown control={control} name={'network'} onChange={onChangeNetwork} />
          </Box>
        </Toolbar>
      </AppBar>

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
