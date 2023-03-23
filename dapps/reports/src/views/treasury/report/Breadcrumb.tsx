import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import BoxWrapperRow from '@karpatkey-monorepo/shared/components/BoxWrapperRow'
import CustomTypography from '@karpatkey-monorepo/shared/components/CustomTypography'
import { NONE } from '@karpatkey-monorepo/shared/config/constants'
import {
  getDAOByAddress,
  getHumanDAO,
  getHumanPeriod,
  getHumanPeriodType,
  isDefaultAddress
} from '@karpatkey-monorepo/shared/utils'
import { Breadcrumbs, styled } from '@mui/material'
import Image from 'next/image'
import * as React from 'react'

const BreadcrumbItem = styled(CustomTypography)(({ theme }) => ({
  fontStyle: 'italic',
  color: theme.palette.text.primary
}))

const Breadcrumb = (props: TReportFilter) => {
  const { chainId, periodType, daoAddress, period } = props
  const daoTitle =
    daoAddress && !isDefaultAddress(daoAddress) ? getHumanDAO(daoAddress, chainId) : 'all the DAOs'
  const periodTypeHuman = periodType ? getHumanPeriodType(periodType) : NONE
  const periodHuman = period && periodType ? getHumanPeriod(period, periodType) : NONE

  const dao = getDAOByAddress(daoAddress, chainId)

  return (
    <BoxWrapperRow gap={2}>
      <BreadcrumbItem>Filtered by:</BreadcrumbItem>
      <Breadcrumbs aria-label="breadcrumb">
        <BreadcrumbItem>
          <BoxWrapperRow component={'span'} gap={1}>
            {dao && <Image src={dao.icon} alt={dao.name} width={16} height={16} />}
            {daoTitle}
          </BoxWrapperRow>
        </BreadcrumbItem>
        <BreadcrumbItem>{periodTypeHuman}</BreadcrumbItem>
        <BreadcrumbItem>{periodHuman}</BreadcrumbItem>
      </Breadcrumbs>
    </BoxWrapperRow>
  )
}

export default Breadcrumb
