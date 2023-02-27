import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import React, { ReactElement } from 'react'

import DrawerAppBar from './DrawerAppBar'
import Footer from './Footer'

interface ILayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps): ReactElement => {
  return (
    <>
      <Container maxWidth="lg">
        <DrawerAppBar />
      </Container>
      <Container maxWidth="lg">
        <Toolbar />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          marginY={8}
        >
          {children}
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default Layout
