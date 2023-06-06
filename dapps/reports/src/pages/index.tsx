import PageLayout from '@karpatkey-monorepo/reports/src/components/Layout/Layout'
import { DAO_DEFAULT } from '@karpatkey-monorepo/reports/src/config/constants'
import { Filter, ReportProps } from '@karpatkey-monorepo/reports/src/types'
import { getCommonServerSideProps } from '@karpatkey-monorepo/reports/src/utils/serverSide'
import { filterSchemaValidation } from '@karpatkey-monorepo/reports/src/validations'
import { DateTime } from 'luxon'
import dynamic from 'next/dynamic'
import { GetServerSidePropsContext } from 'next/types'
import React, { ReactElement } from 'react'

const HomepageContent = dynamic(() => import('@karpatkey-monorepo/reports/src/views/Homepage'))
const Homepage = (props: ReportProps) => <HomepageContent {...props} />

Homepage.getTitle = 'Home'

Homepage.getLayout = (page: ReactElement) => <PageLayout>{page}</PageLayout>

export default Homepage

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query } = ctx
  const { month = DateTime.local().month, year = DateTime.local().year, dao = DAO_DEFAULT } = query

  const params = { dao, month, year } as Filter

  // We validate the params here to avoid any errors in the page
  await filterSchemaValidation.validate(params)

  const {
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
    farmingFundsByProtocol,
    farmingResultsDetailsByProtocol,
    totalFarmingResultsFarmSwaps,
    tokenDetails,
    tokenDetailsGrouped,
    tokenDetailByPosition
  } = await getCommonServerSideProps(params)

  // Pass data to the page via props
  return {
    props: {
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
      farmingFundsByProtocol,
      farmingResultsDetailsByProtocol,
      totalFarmingResultsFarmSwaps,
      tokenDetails,
      tokenDetailsGrouped,
      tokenDetailByPosition,
      ...params
    }
  }
}
