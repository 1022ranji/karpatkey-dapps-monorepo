import ButtonAddress from '@karpatkey-monorepo/reports/src/components/ButtonAddress'
import AnimatePresenceWrapper from '@karpatkey-monorepo/shared/components/AnimatePresenceWrapper'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { DAO_ADDRESS, FILTER_DAO } from '@karpatkey-monorepo/shared/config/constants'
import { getDAO, getMonthName } from '@karpatkey-monorepo/shared/utils'
import Image from 'next/image'
import * as React from 'react'
import { useApp } from '@karpatkey-monorepo/reports/src/contexts/app.context'

const Hero = () => {
  const { state } = useApp()

  const { DAO: filterDAO, month } = state

  const { dao, monthName } = React.useMemo(() => {
    const dao: FILTER_DAO | undefined = getDAO(filterDAO)
    const monthName = month ? getMonthName(+month) : null

    return { dao, monthName }
  }, [filterDAO, month])

  if (!dao || !monthName) {
    return null
  }

  return (
    <AnimatePresenceWrapper>
      <BoxWrapperColumn sx={{ margin: '30px 30px 30px 30px', alignItems: 'flex-start' }} gap={4}>
        <BoxWrapperRow gap={2}>
          <Image src={dao?.icon ?? ''} alt={dao?.name} width={116} height={116} key={dao?.icon} />
          <a className="anchor" id="summary" />
          <BoxWrapperColumn
            sx={{ alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'space-between' }}
          >
            <CustomTypography variant="heroSectionTitle">{dao?.name?.trim()}</CustomTypography>
            <CustomTypography variant="heroSectionSubtitle">
              {monthName.trim()} Treasury Report
            </CustomTypography>
          </BoxWrapperColumn>
        </BoxWrapperRow>
        <BoxWrapperRow gap={1} sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
          {dao?.addresses
            // sort by item order
            .sort((a: DAO_ADDRESS, b: DAO_ADDRESS) => a.order - b.order)
            .map((daoAddress: DAO_ADDRESS, index: number) => (
              <ButtonAddress key={index} daoAddress={daoAddress} />
            ))}
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </AnimatePresenceWrapper>
  )
}

export default Hero
