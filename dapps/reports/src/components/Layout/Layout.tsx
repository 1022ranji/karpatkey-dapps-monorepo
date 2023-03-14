import Content from '@karpatkey-monorepo/shared/layout/Content'
import Footer from '@karpatkey-monorepo/shared/layout/Footer'
import LayoutWrapper from '@karpatkey-monorepo/shared/layout/LayoutWrapper'
import React, { ReactElement } from 'react'

import DrawerAppBar from './DrawerAppBar'

interface ILayoutProps {
  children: React.ReactNode
}

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
