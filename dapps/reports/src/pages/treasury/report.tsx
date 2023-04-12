import { TReportFilter, TReportProps } from '@karpatkey-monorepo/reports/src/types'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import ContainerWrapper from '@karpatkey-monorepo/shared/components/ContainerWrapper'
import { DAO_NAME_DEFAULT, PERIOD_TYPE_DEFAULT } from '@karpatkey-monorepo/shared/config/constants'
import { existDAOKeyName } from '@karpatkey-monorepo/shared/utils'
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
    period = DateTime.now().toISODate(),
    periodType = PERIOD_TYPE_DEFAULT,
    daoName = DAO_NAME_DEFAULT
  } = query

  const existDAO = existDAOKeyName(daoName as DAO_NAME)
  if (!existDAO) {
    throw new Error('DAO does not exist')
  }

  const params = { daoName, period, periodType } as TReportFilter

  // We validate the params here to avoid any errors in the page
  await filterSchemaValidation.validate(params)

  const {
    summary = [] as any[],
    totalFunds = 0,
    capitalUtilization = 0,
    farmingResults = 0,
    fundsByTokenCategory = [],
    fundsByType = [],
    fundsByBlockchain = [],
    fundsByProtocol = [],
    balanceOverviewType = [],
    balanceOverviewBlockchain = [],
    rowsTreasuryVariation = [],
    rowsHistoricVariation = [],
    rowsTreasuryVariationForThePeriodDetail = [],
    totalFarmingFunds = 0,
    rowsFarmingFundsByProtocol,
    rowsFarmingFundsByProtocolTotals
  } = await getCommonServerSideProps(params)

  // Pass data to the page via props
  return {
    props: {
      summary,
      totalFunds,
      capitalUtilization,
      farmingResults,
      fundsByTokenCategory,
      fundsByType,
      fundsByBlockchain,
      fundsByProtocol,
      balanceOverviewType,
      balanceOverviewBlockchain,
      rowsTreasuryVariation,
      rowsHistoricVariation,
      rowsTreasuryVariationForThePeriodDetail,
      totalFarmingFunds,
      rowsFarmingFundsByProtocol,
      rowsFarmingFundsByProtocolTotals,
      ...params
    }
  }
}
