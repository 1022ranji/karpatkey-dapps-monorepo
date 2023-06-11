import ButtonAddress from '@karpatkey-monorepo/reports/src/components/ButtonAddress'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/Wrappers/BoxWrapperRow'
import { FILTER_DAO } from '@karpatkey-monorepo/shared/config/constants'
import { getDAO, getMonthName, slugify } from '@karpatkey-monorepo/shared/utils'
import Image from 'next/image'
import * as React from 'react'

const Hero = () => {
  const { state } = useFilter()

  const filter = state.value

  const dao: Maybe<FILTER_DAO> = getDAO(filter.dao) || null
  const monthName = filter.month ? getMonthName(filter.month) : null

  if (!dao || !monthName) {
    return null
  }

  return (
    <BoxWrapperColumn
      sx={{ margin: '30px 30px', alignItems: 'flex-start' }}
      id={slugify('summary')}
      className={'scrollable'}
      gap={4}
    >
      <BoxWrapperRow gap={4}>
        <Image src={dao.icon} alt={dao.name} width={116} height={116} />
        <BoxWrapperColumn
          sx={{ alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'space-between' }}
        >
          <CustomTypography variant="heroSectionTitle">{dao.name.trim()}</CustomTypography>
          <CustomTypography variant="heroSectionSubtitle">
            {monthName.trim()} Treasury Report
          </CustomTypography>
        </BoxWrapperColumn>
      </BoxWrapperRow>
      <BoxWrapperRow gap={4}>
        {dao.addresses.map((daoAddress, index) => (
          <ButtonAddress key={index} daoAddress={daoAddress} />
        ))}
      </BoxWrapperRow>
    </BoxWrapperColumn>
  )
}

export default Hero
