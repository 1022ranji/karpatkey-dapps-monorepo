import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import Cache from '@karpatkey-monorepo/shared/services/classes/cache.class'

import { getDAOByDAOName, getDateTypeByPeriodType, getMetricByPeriodType } from './index'
import {
  mapBalancesByTokenCategory,
  reducerBalancesByTokenCategory,
  reducerCapitalUtilization,
  reducerFarmingResults,
  reducerTotalFunds
} from './mappers'

export const getCommonServerSideProps = async (params: TReportFilter) => {
  const { periodType, daoName } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as Report
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as Report)

  const { keyName } = getDAOByDAOName(daoName) || {}
  const metricPeriodType = getMetricByPeriodType(periodType)
  const dateTypePeriodType = getDateTypeByPeriodType(periodType)
  // const metricPeriod = getMetricByPeriod(period, periodType)

  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) => {
    return row.metric === metricPeriodType && row.dao === keyName && row.year_month === '2023_12'
  })

  //TODO: continue here
  const financialMetricsFiltered = financialMetrics.filter((row: any) => {
    return (
      row.date_type === dateTypePeriodType && row.dao === keyName && row.year_month === '2023_12'
    )
  })

  const variationMetricsDetailFilteredReduced = variationMetricsDetailFiltered.reduce(
    reducerBalancesByTokenCategory,
    []
  )
  // Summary blocks
  const totalFunds = variationMetricsDetailFiltered.reduce(reducerTotalFunds, 0)
  const capitalUtilization = financialMetricsFiltered.reduce(reducerCapitalUtilization, 0)
  const farmingResults = financialMetricsFiltered.reduce(reducerFarmingResults, 0)

  const summary = mapBalancesByTokenCategory(variationMetricsDetailFilteredReduced)
  return { summary, totalFunds, capitalUtilization, farmingResults }
}
