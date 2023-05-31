import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { Filter } from '@karpatkey-monorepo/reports/src/types'
import { getDAO } from '@karpatkey-monorepo/shared/utils'
import {
  getBalanceOverviewByBlockchain,
  getBalanceOverviewByType
} from '@karpatkey-monorepo/shared/utils/mappers/balanceOverview'
import {
  getFarmingFundsByProtocol,
  getFarmingResultsDetailsByProtocol,
  getFarmingResultsFarmSwapsTotal
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
import { getTokenDetails } from '@karpatkey-monorepo/shared/utils/mappers/tokenDetails'
import {
  getTreasuryVariationForThePeriod,
  getTreasuryVariationForThePeriodDetails,
  getTreasuryVariationHistory
} from '@karpatkey-monorepo/shared/utils/mappers/treasuryVariation'

export const getCommonServerSideProps = async (params: Filter) => {
  const { month, year, dao } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as Report
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as Report)
  const financialPositions = await cache.getReport('getTreasuryFinancialPositions' as Report)
  const historicVariation = await cache.getReport('getTreasuryHistoricVariation' as Report)

  if (!dao) {
    throw new Error('DAO not found')
  }

  // Step 3: Get filter data like daoName, periodType and period
  const daoObject = getDAO(dao)
  const daoKeyName = daoObject?.keyName
  const metricPeriodType = 'month'
  const metricPeriod = `${year}_${month}`

  // Step 4: Apply filters to the data by common params, like daoName, periodType and period
  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) => {
    return (
      row.date_type === metricPeriodType &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const financialPositionsFiltered = financialPositions.filter((row: any) => {
    return (
      row.date_type === metricPeriodType &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const historicVariationFiltered = historicVariation.filter((row: any) => {
    return (
      row.date_type === metricPeriodType &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
    )
  })

  const financialMetricsFiltered = financialMetrics.filter((row: any) => {
    return (
      row.date_type === metricPeriodType &&
      row.dao === daoKeyName &&
      row.year_month === metricPeriod
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
  // Farming funds / Results by protocol
  const farmingFundsByProtocol = getFarmingFundsByProtocol(financialPositionsFiltered)

  // Farming result from farm swaps
  const totalFarmingResultsFarmSwaps = getFarmingResultsFarmSwapsTotal(financialMetricsFiltered)

  // Farming results details by protocol
  const farmingResultsDetailsByProtocol =
    getFarmingResultsDetailsByProtocol(financialMetricsFiltered)

  // Token detail
  const tokenDetails = getTokenDetails(variationMetricsDetailFiltered)

  return {
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
    tokenDetails
  }
}
