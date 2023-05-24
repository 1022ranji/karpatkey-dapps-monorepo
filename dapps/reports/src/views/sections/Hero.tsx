import ButtonAddress from '@karpatkey-monorepo/reports/src/components/ButtonAddress'
import { useFilter } from '@karpatkey-monorepo/reports/src/contexts/filter.context'
import BoxWrapperColumn from '@karpatkey-monorepo/shared/components/BoxWrapperColumn'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { FILTER_DAO } from '@karpatkey-monorepo/shared/config/constants'
import { getDAO, getMonthName, slugify } from '@karpatkey-monorepo/shared/utils'
import { styled } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'

const SpanHidden = styled('span')({
  display: 'block',
  position: 'relative',
  top: '-140px',
  visibility: 'hidden'
})

const Hero = () => {
  const { state } = useFilter()

  const filter = state.value

  const dao: Maybe<FILTER_DAO> = getDAO(Number(filter.dao)) || null
  const monthName = filter.month ? getMonthName(Number(filter.month)) : null

  if (!dao || !monthName) {
    return null
  }

  return (
    <BoxWrapperColumn sx={{ margin: '30px 30px' }}>
      <SpanHidden id={slugify('summary')} />
      <BoxWrapperColumn sx={{ alignItems: 'flex-start' }} gap={4}>
        <BoxWrapperRow gap={2}>
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
        <BoxWrapperRow gap={2}>
          {dao.addresses.map((daoAddress, index) => {
            return <ButtonAddress key={index} daoAddress={daoAddress} />
          })}
        </BoxWrapperRow>
      </BoxWrapperColumn>
    </BoxWrapperColumn>
  )
}

export default Hero
