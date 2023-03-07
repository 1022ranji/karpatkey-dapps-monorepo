import { styled } from '@mui/material'
import React, { ReactElement } from 'react'

import Content from './Content'
import DrawerAppBar from './DrawerAppBar'
import Footer from './Footer'

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
