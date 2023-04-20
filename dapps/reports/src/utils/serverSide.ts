import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import {
  getDAOByDAOName,
  getDateTypeByPeriodType,
  getMetricByPeriodType
} from '@karpatkey-monorepo/shared/utils/'
import {
  mapBalancesByTokenCategory,
  reducerBalancesByTokenCategory
} from '@karpatkey-monorepo/shared/utils//mappers'
import {
  getBalanceOverviewByBlockchain,
  getBalanceOverviewByType
} from '@karpatkey-monorepo/shared/utils/mappers/balanceOverview'
import {
  getFarmingFundsByProtocol,
  getFarmingFundsByProtocolTotals,
  getFarmingFundsTotal,
  getFarmingResultsDetailsByProtocol,
  getFarmingResultsDetailsByProtocolTotals
} from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import {
  getCapitalUtilization,
  getFarmingResults,
  getSummaryFundsByBlockchain,
  getSummaryFundsByProtocol,
  getSummaryFundsByTokenCategory,
  getSummaryFundsByType,
  getTotalFunds
} from '@karpatkey-monorepo/shared/utils/mappers/summary'
import {
  getTreasuryVariationForThePeriod,
  getTreasuryVariationForThePeriodDetails,
  getTreasuryVariationHistory
} from '@karpatkey-monorepo/shared/utils/mappers/treasuryVariation'

export const getCommonServerSideProps = async (params: TReportFilter) => {
  const { periodType, daoName } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as TReport
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as TReport)
  const financialPositions = await cache.getReport('getTreasuryFinancialPositions' as TReport)
  const historicVariation = await cache.getReport('getTreasuryHistoricVariation' as TReport)

  // Step 3: Get filter data like daoName, periodType and period
  const { keyName } = getDAOByDAOName(daoName) || {}
  const metricPeriodType = getMetricByPeriodType(periodType)
  const dateTypePeriodType = getDateTypeByPeriodType(periodType)
  const metricPeriod = '2023_3' //getMetricByPeriod(period, periodType)

  // Step 4: Apply filters to the data by common params, like daoName, periodType and period
  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) => {
    return (
      row.metric.includes(metricPeriodType) &&
      row.dao === keyName &&
      row.year_month === metricPeriod
    )
  })

  const financialPositionsFiltered = financialPositions.filter((row: any) => {
    return (
      row.date_type.includes(dateTypePeriodType) &&
      row.dao === keyName &&
      row.year_month === metricPeriod
    )
  })

  const historicVariationFiltered = historicVariation.filter((row: any) => {
    return (
      row.date_type.includes(dateTypePeriodType) &&
      row.dao === keyName &&
      row.year_month === metricPeriod
    )
  })

  const financialMetricsFiltered = financialMetrics.filter((row: any) => {
    return (
      row.date_type === dateTypePeriodType && row.dao === keyName && row.year_month === metricPeriod
    )
  })

  // #####################################################

  // #### Summary blocks ####

  // Funds by token category
  const fundsByTokenCategory = getSummaryFundsByTokenCategory(variationMetricsDetailFiltered)

  // Funds by type
  const fundsByType = getSummaryFundsByType(variationMetricsDetailFiltered)

  // Funds by blockchain
  const fundsByBlockchain = getSummaryFundsByBlockchain(variationMetricsDetailFiltered)

  // Funds by protocol
  const fundsByProtocol = getSummaryFundsByProtocol(financialPositionsFiltered)

  // Summary blocks
  const totalFunds = getTotalFunds(variationMetricsDetailFiltered)
  const capitalUtilization = getCapitalUtilization(financialMetricsFiltered)
  const farmingResults = getFarmingResults(financialMetricsFiltered)

  // #### Balance Overview block ####
  // Funds by token category / Type
  const balanceOverviewType = getBalanceOverviewByType(variationMetricsDetailFiltered)

  // Funds by token category / Blockchain
  const balanceOverviewBlockchain = getBalanceOverviewByBlockchain(variationMetricsDetailFiltered)

  // #### Treasury variation ####
  // For the period
  const rowsTreasuryVariation = getTreasuryVariationForThePeriod(financialMetricsFiltered)

  // In this year
  const rowsHistoricVariation = getTreasuryVariationHistory(historicVariationFiltered)

  // For the period, detail
  const rowsTreasuryVariationForThePeriodDetail =
    getTreasuryVariationForThePeriodDetails(financialMetricsFiltered)

  // #### Farming Funds / Results
  // Farming result block
  const totalFarmingFunds = getFarmingFundsTotal(financialMetricsFiltered)

  // Farming funds / Results by protocol
  const rowsFarmingFundsByProtocol = getFarmingFundsByProtocol(financialPositionsFiltered)

  // Farming funds / Results by protocol Totals
  const rowsFarmingFundsByProtocolTotals = getFarmingFundsByProtocolTotals(
    rowsFarmingFundsByProtocol
  )

  // Farming results details by protocol
  const rowsFarmingResultsDetailsByProtocol =
    getFarmingResultsDetailsByProtocol(financialMetricsFiltered)

  const rowsFarmingResultsDetailsByProtocolTotals = getFarmingResultsDetailsByProtocolTotals(
    rowsFarmingResultsDetailsByProtocol
  )

  // TODO: delete this two lines after the refactor
  const variationMetricsDetailFilteredReduced = variationMetricsDetailFiltered.reduce(
    reducerBalancesByTokenCategory,
    []
  )
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
    balanceOverviewType,
    balanceOverviewBlockchain,
    rowsTreasuryVariation,
    rowsHistoricVariation,
    rowsTreasuryVariationForThePeriodDetail,
    totalFarmingFunds,
    rowsFarmingFundsByProtocol,
    rowsFarmingFundsByProtocolTotals,
    rowsFarmingResultsDetailsByProtocol,
    rowsFarmingResultsDetailsByProtocolTotals
  }
}
