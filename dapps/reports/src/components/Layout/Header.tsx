import Filters from '@karpatkey-monorepo/reports/src/components/Filters/Menu'
import Logo from '@karpatkey-monorepo/shared/components/Logo'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import React from 'react'

export const HEADER_HEIGHT = 100

const Header = () => {
  return (
    <BoxWrapperRow
      sx={{
        backgroundColor: 'background.default',
        justifyContent: 'space-between',
        marginX: '48px',
        height: HEADER_HEIGHT
      }}
    >
      <Logo />
      <Filters />
    </BoxWrapperRow>
  )
}

export default Header
