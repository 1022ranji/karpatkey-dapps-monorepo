import Content from '@karpatkey-monorepo/shared/layout/Content'
import Footer from '@karpatkey-monorepo/shared/layout/Footer'
import { styled } from '@mui/material'
import React, { ReactElement } from 'react'

import DrawerAppBar from './DrawerAppBar'

interface ILayoutProps {
  children: React.ReactNode
}

const LayoutWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
  minHeight: 0
}))

const Layout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <LayoutWrapper>
      <DrawerAppBar />
      <Content>{children}</Content>
      <Footer />
    </LayoutWrapper>
  )
}

export default Layout
