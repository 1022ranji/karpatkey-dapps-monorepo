import WrapperDrawerAppBar from '@karpatkey-monorepo/reports/src/components/Layout/WrapperDrawerAppBar'
import Footer from '@karpatkey-monorepo/shared/layout/Footer'
import LayoutWrapper from '@karpatkey-monorepo/shared/layout/LayoutWrapper'
import React, { ReactElement } from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <WrapperDrawerAppBar>
      <LayoutWrapper>
        {children}
        <Footer />
      </LayoutWrapper>
    </WrapperDrawerAppBar>
  )
}

export default Layout
