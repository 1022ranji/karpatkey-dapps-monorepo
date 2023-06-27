import Filters from '@karpatkey-monorepo/reports/src/components/Filters/Menu'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import Logo from '@karpatkey-monorepo/shared/components/Logo'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import React from 'react'

export const HEADER_HEIGHT = 100

const Header = () => {
  return (
    <AnimatePresenceWrapper>
      <BoxWrapperRow
        sx={{
          backgroundColor: 'background.default',
          justifyContent: 'space-between',
          paddingX: '26px',
          height: HEADER_HEIGHT
        }}
      >
        <Logo />
        <Filters />
      </BoxWrapperRow>
    </AnimatePresenceWrapper>
  )
}

export default Header
