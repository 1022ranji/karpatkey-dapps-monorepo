import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import Cache from '@karpatkey-monorepo/shared/services/classes/cache.class'

import { getDAOByDAOName, getDateTypeByPeriodType, getMetricByPeriodType } from './index'
import {
  mapBalancesByTokenCategory,
  mapperBalanceOverviewType,
  mapperFundsByBlockchain,
  mapperFundsByProtocol,
  mapperFundsByTokenCategory,
  mapperFundsByType,
  reducerBalanceOverviewType,
  reducerBalancesByTokenCategory,
  reducerCapitalUtilization,
  reducerFarmingResults,
  reducerFundsByBlockchain,
  reducerFundsByProtocol,
  reducerFundsByTokenCategory,
  reducerFundsByType,
  reducerTotalFunds
} from './mappers'

// TODO try to reduce the size of this function in some way
export const getCommonServerSideProps = async (params: TReportFilter) => {
  const { periodType, daoName } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as Report
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as Report)
  const financialPositions = await cache.getReport('getTreasuryFinancialPositions' as Report)

  // Step 3: Filter data by common params, like daoName, periodType and period
  const { keyName } = getDAOByDAOName(daoName) || {}
  const metricPeriodType = getMetricByPeriodType(periodType)
  const dateTypePeriodType = getDateTypeByPeriodType(periodType)
  // const metricPeriod = getMetricByPeriod(period, periodType)

  // Filter data by common params, like daoName, periodType and period
  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) => {
    return (
      row.metric.includes(metricPeriodType) && row.dao === keyName && row.year_month === '2023_12'
    )
  })

  const financialPositionsFiltered = financialPositions.filter((row: any) => {
    return (
      row.date_type.includes(dateTypePeriodType) &&
      row.dao === keyName &&
      row.year_month === '2023_12'
    )
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

  // #### Summary blocks ####

  // Funds by token category
  const rowsFundsByTokenCategory = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerFundsByTokenCategory, [])
  const fundsByTokenCategory = mapperFundsByTokenCategory(rowsFundsByTokenCategory).sort(
    (a: any, b: any) => b.funds - a.funds
  )

  // Funds by type
  const rowsFundsByType = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerFundsByType, [])
  const fundsByType = mapperFundsByType(rowsFundsByType).sort((a: any, b: any) => b.funds - a.funds)

  // Funds by blockchain
  const rowsFundsByBlockchain = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerFundsByBlockchain, [])
  const fundsByBlockchain = mapperFundsByBlockchain(rowsFundsByBlockchain).sort(
    (a: any, b: any) => b.funds - a.funds
  )

  // Funds by protocol
  const rowsFundsByProtocol = financialPositionsFiltered.reduce(reducerFundsByProtocol, [])
  const fundsByProtocol = mapperFundsByProtocol(rowsFundsByProtocol).sort(
    (a: any, b: any) => b.funds - a.funds
  )

  // Summary blocks
  const totalFunds = variationMetricsDetailFiltered.reduce(reducerTotalFunds, 0)
  const capitalUtilization = financialMetricsFiltered.reduce(reducerCapitalUtilization, 0)
  const farmingResults = financialMetricsFiltered.reduce(reducerFarmingResults, 0)

  // #### Balance Overview block ####
  const rowsBalanceOverviewType = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerBalanceOverviewType, [])

  const balanceOverviewType = mapperBalanceOverviewType(rowsBalanceOverviewType).sort(
    (a: any, b: any) => b.funds - a.funds
  )

  // Temp
  const summary = mapBalancesByTokenCategory(variationMetricsDetailFilteredReduced)

  return {
    summary,
    totalFunds,
    capitalUtilization,
    farmingResults,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol,
    balanceOverviewType
  }
}
