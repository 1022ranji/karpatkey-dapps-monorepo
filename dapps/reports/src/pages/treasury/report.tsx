import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import {
  DAO_DEFAULT,
  NETWORK_DEFAULT,
  PERIOD_TYPE_DEFAULT
} from '@karpatkey-monorepo/shared/config/constants'
import { existAddressInDAOs } from '@karpatkey-monorepo/shared/utils'
import { getCommonServerSideProps } from '@karpatkey-monorepo/shared/utils/serverSide'
import { DateTime } from 'luxon'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next/types'
import * as React from 'react'

const DynamicReport = dynamic(
  () => import('@karpatkey-monorepo/reports/src/views/treasury/report/Page')
)

export default function Report(props: TReportProps) {
  return (
    <ContainerWrapper>
      <DynamicReport {...props} />
    </ContainerWrapper>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx
  const {
    chainId = NETWORK_DEFAULT,
    period = DateTime.now().toISODate(),
    periodType = PERIOD_TYPE_DEFAULT
  } = query

  let daoAddress = query.daoAddress || DAO_DEFAULT

  if (daoAddress || daoAddress.trim() === '') {
    const existAddress = existAddressInDAOs(daoAddress as string, chainId as NetworkId)

    if (!existAddress) {
      daoAddress = DAO_DEFAULT
    }
  }

  const params = { chainId: +chainId, daoAddress, period, periodType } as TReportFilter

  // We validate the params here to avoid any errors in the page
  await filterSchemaValidation.validate(params)

  const { summaryData = [] as any[] } = await getCommonServerSideProps(params)

  // Pass data to the page via props
  return { props: { summaryData, ...params } }
}
