import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { Filter } from '@karpatkey-monorepo/reports/src/types'
import { getDAO, getLatestMonth } from '@karpatkey-monorepo/shared/utils'
import {
  getBalanceOverviewByBlockchain,
  getBalanceOverviewByType
} from '@karpatkey-monorepo/shared/utils/mappers/balanceOverview'
import {
  getDeFiFundsTotal,
  getFarmingFundsByProtocol,
  getFarmingResultsDetailsByProtocol,
  getFarmingResultsFarmSwapsTotal
} from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import {
  getCapitalUtilization,
  getFarmingResults,
  getGlobalROI,
  getSummaryFundsByBlockchain,
  getSummaryFundsByProtocol,
  getSummaryFundsByTokenCategory,
  getSummaryFundsByType,
  getTotalFunds
} from '@karpatkey-monorepo/shared/utils/mappers/summary'
import {
  getTokenDetailByPosition,
  getTokenDetails,
  getTokenDetailsGrouped,
  getWalletTokenDetails
} from '@karpatkey-monorepo/shared/utils/mappers/tokenDetails'
import {
  getTreasuryVariationForThePeriod,
  getTreasuryVariationForThePeriodDetails,
  getTreasuryVariationHistory
} from '@karpatkey-monorepo/shared/utils/mappers/treasuryVariation'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { DataWarehouse } from '../services/classes/dataWarehouse.class'

const summaryData = ({
  variationMetricsDetailFiltered,
  financialPositionsFiltered,
  financialMetricAndVarDetailFiltered,
  treasuryFinancialMetricsWaterfallFiltered,
  waterfall1ReportFiltered,
  totalFundsByTokenCategoryFiltered
}: any) => {
  // Funds by token category
  const fundsByTokenCategory = getSummaryFundsByTokenCategory(totalFundsByTokenCategoryFiltered)

  // Funds by type
  const fundsByType = getSummaryFundsByType(variationMetricsDetailFiltered)

  // Funds by blockchain
  const fundsByBlockchain = getSummaryFundsByBlockchain(variationMetricsDetailFiltered)

  // Funds by protocol
  const fundsByProtocol = getSummaryFundsByProtocol(financialPositionsFiltered)

  // Summary blocks
  const totalFunds = getTotalFunds(financialMetricAndVarDetailFiltered)
  const capitalUtilization = getCapitalUtilization(treasuryFinancialMetricsWaterfallFiltered)
  const farmingResults = getFarmingResults(waterfall1ReportFiltered)
  const globalROI = getGlobalROI(treasuryFinancialMetricsWaterfallFiltered)

  return {
    totalFunds,
    capitalUtilization,
    farmingResults,
    globalROI,
    fundsByTokenCategory,
    fundsByType,
    fundsByBlockchain,
    fundsByProtocol
  }
}

const balanceOverviewData = ({ variationMetricsDetailFiltered }: any) => {
  // Funds by token category / Type
  const balanceOverviewType = getBalanceOverviewByType(variationMetricsDetailFiltered)

  // Funds by token category / Blockchain
  const balanceOverviewBlockchain = getBalanceOverviewByBlockchain(variationMetricsDetailFiltered)

  return {
    balanceOverviewType,
    balanceOverviewBlockchain
  }
}

const treasuryVariationData = ({
  waterfall1ReportFiltered,
  historicVariationFiltered,
  treasuryFinancialMetricsWaterfallFiltered
}: any) => {
  // For the period
  const treasuryVariationData = getTreasuryVariationForThePeriod(waterfall1ReportFiltered)

  // In this year
  const historicVariationData = getTreasuryVariationHistory(historicVariationFiltered)

  // For the period, detail
  const treasuryVariationForThePeriodDetailData = getTreasuryVariationForThePeriodDetails(
    treasuryFinancialMetricsWaterfallFiltered
  )

  return {
    treasuryVariationData,
    historicVariationData,
    treasuryVariationForThePeriodDetailData
  }
}

const farmingFundsData = ({
  waterfall1ReportFiltered,
  financialPositionsFiltered,
  financialMetricsFiltered
}: any) => {
  // Funds and results by position
  const farmingFundsByProtocol = getFarmingFundsByProtocol(financialPositionsFiltered)

  // DeFi results
  const defiResults = getDeFiFundsTotal(waterfall1ReportFiltered)

  // Farming result from farm swaps
  const totalFarmingResultsFarmSwaps = getFarmingResultsFarmSwapsTotal(financialMetricsFiltered)

  // Farming results details by protocol
  const farmingResultsDetailsByProtocol =
    getFarmingResultsDetailsByProtocol(financialMetricsFiltered)

  return {
    defiResults,
    farmingFundsByProtocol,
    totalFarmingResultsFarmSwaps,
    farmingResultsDetailsByProtocol
  }
}

const tokenDetailsData = ({
  variationMetricsDetailFiltered,
  financialMetricAndVarDetailFiltered
}: any) => {
  const tokenDetails = getTokenDetails(variationMetricsDetailFiltered)
  const tokenDetailsGrouped = getTokenDetailsGrouped(variationMetricsDetailFiltered)

  // Token detail by position
  const tokenDetailByPosition = getTokenDetailByPosition(financialMetricAndVarDetailFiltered)

  // Wallet token detail
  const walletTokenDetail = getWalletTokenDetails(variationMetricsDetailFiltered)

  return {
    tokenDetails,
    tokenDetailsGrouped,
    tokenDetailByPosition,
    walletTokenDetail
  }
}

const getDAOResume = async ({
  dao,
  variationMetricsDetail,
  financialMetrics,
  financialMetricAndVarDetail
}: any) => {
  const daoFound = FILTER_DAOS.find((filterDao: FILTER_DAO) => {
    return filterDao.keyName.toLowerCase() === (dao as string).toLowerCase()
  })
  const metricPeriodType = 'month'

  const month = getLatestMonth()
  const year = new Date().getFullYear()
  const metricPeriod = `${year}_${month}`

  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) =>
    filterValues(row, metricPeriodType, dao, metricPeriod)
  )
  const financialMetricsFiltered = financialMetrics.filter((row: any) =>
    filterValues(row, metricPeriodType, dao, metricPeriod)
  )
  const financialMetricAndVarDetailFiltered = financialMetricAndVarDetail.filter((row: any) =>
    filterValues(row, metricPeriodType, dao, metricPeriod)
  )

  const totalFunds = getTotalFunds(variationMetricsDetailFiltered)
  const capitalUtilization = getCapitalUtilization(financialMetricsFiltered)
  const farmingResults = getFarmingResults(financialMetricsFiltered)
  const globalROI = getGlobalROI(financialMetricAndVarDetailFiltered)

  const urlToReport = `?dao=${daoFound?.id}&month=${month}&year=${year}`

  return {
    totalFunds,
    capitalUtilization,
    farmingResults,
    globalROI,
    urlToReport
  }
}

const filterValues = (
  row: {
    date_type: string
    dao: string
    year_month: string
  },
  metricPeriodType: string,
  daoKeyName: DAO_NAME | undefined,
  metricPeriod: Maybe<string>
) => {
  return (
    row.date_type === metricPeriodType && row.dao === daoKeyName && row.year_month === metricPeriod
  )
}

export const getCommonServerSideProps = async (params: Filter) => {
  const { month, year, dao } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const variationMetricsDetail = await cache.getReport(
    'getTreasuryVariationMetricsDetail' as unknown as Report
  )
  const financialMetrics = await cache.getReport('getTreasuryFinancialMetrics' as unknown as Report)
  const financialPositions = await cache.getReport(
    'getTreasuryFinancialPositions' as unknown as Report
  )
  const historicVariation = await cache.getReport(
    'getTreasuryHistoricVariation' as unknown as Report
  )

  const financialMetricAndVarDetail = await cache.getReport(
    'getFinancialMetricAndVarDetail' as unknown as Report
  )

  const treasuryFinancialMetricsWaterfall = await cache.getReport(
    'getTreasuryFinancialMetricsWaterfall' as unknown as Report
  )

  const waterfall1Report = await cache.getReport('getWaterfall1Report' as unknown as Report)

  const totalFundsByTokenCategory = await cache.getReport(
    'getTotalFundsByTokenCategory' as unknown as Report
  )

  // Step 3: Get filter data like daoName, periodType and period
  const DAO = getDAO(dao)
  const daoKeyName = DAO?.keyName
  const metricPeriodType = 'month'
  const metricPeriod: Maybe<string> = year && month ? `${year}_${month}` : null

  // Step 4: Apply filters to the data by common params, like daoName, periodType and period
  const variationMetricsDetailFiltered = variationMetricsDetail.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const financialPositionsFiltered = financialPositions.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const historicVariationFiltered = historicVariation.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const financialMetricsFiltered = financialMetrics.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const financialMetricAndVarDetailFiltered = financialMetricAndVarDetail.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const treasuryFinancialMetricsWaterfallFiltered = treasuryFinancialMetricsWaterfall.filter(
    (row: any) => filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  const waterfall1ReportFiltered = waterfall1Report.filter((row: any) => {
    return row.dao === daoKeyName && row.year_month === metricPeriod
  })

  const totalFundsByTokenCategoryFiltered = totalFundsByTokenCategory.filter((row: any) =>
    filterValues(row, metricPeriodType, daoKeyName, metricPeriod)
  )

  // #####################################################

  // #### Summary blocks ####
  const summaryDataValues = summaryData({
    variationMetricsDetailFiltered,
    financialPositionsFiltered,
    financialMetricAndVarDetailFiltered,
    treasuryFinancialMetricsWaterfallFiltered,
    waterfall1ReportFiltered,
    totalFundsByTokenCategoryFiltered
  })

  // #### Balance Overview block ####
  const balanceOverviewValues = balanceOverviewData({ variationMetricsDetailFiltered })

  // #### Treasury variation ####
  const treasuryVariationValues = treasuryVariationData({
    waterfall1ReportFiltered,
    historicVariationFiltered,
    treasuryFinancialMetricsWaterfallFiltered
  })

  // #### Funds and results by position ####
  const farmingFundsValues = farmingFundsData({
    waterfall1ReportFiltered,
    financialPositionsFiltered,
    financialMetricsFiltered
  })

  // #### Token detail ####
  const tokenDetailsValues = tokenDetailsData({
    variationMetricsDetailFiltered,
    financialMetricAndVarDetailFiltered
  })

  const daoResumePromises = FILTER_DAOS.filter((filterDao: FILTER_DAO) => filterDao.isEnabled).map(
    async (dao: FILTER_DAO) => {
      const daoResume = await getDAOResume({
        dao: dao.keyName,
        variationMetricsDetail,
        financialMetrics,
        financialMetricAndVarDetail
      })
      return {
        name: dao.name,
        keyName: dao.keyName,
        icon: dao.icon,
        shouldBeDisplayedHomepage: dao.shouldBeDisplayedHomepage,
        isEnabled: dao.isEnabled,
        ...daoResume
      }
    }
  )
  const daoResume = await Promise.all(daoResumePromises)

  const nonCustodialAum = daoResume.reduce((acc, dao) => {
    if (!dao.shouldBeDisplayedHomepage) return acc
    return acc + dao.totalFunds
  }, 0)

  const lastMonthFarmingResults = daoResume.reduce((acc, dao) => {
    if (!dao.shouldBeDisplayedHomepage) return acc
    return acc + dao.farmingResults
  }, 0)

  // sort daoResume by total funds, but keep the item with keyName equal to "karpatkey DAO" at the last item
  const daoResumeSorted = daoResume.sort((a, b) => {
    if (a.keyName === 'karpatkey DAO') return 1
    if (b.keyName === 'karpatkey DAO') return -1
    return b.totalFunds - a.totalFunds
  })
  const latestMonth = getLatestMonth()

  const dataWarehouse = DataWarehouse.getInstance()
  const ourDaoTreasuriesData = await dataWarehouse.getOurDAOTreasury()
  const ourDaoTreasuries = ourDaoTreasuriesData.length > 0 ? ourDaoTreasuriesData[0].value : 0

  return {
    ...summaryDataValues,
    ...balanceOverviewValues,
    ...treasuryVariationValues,
    ...farmingFundsValues,
    ...tokenDetailsValues,
    daoResume: daoResumeSorted,
    nonCustodialAum,
    ourDaoTreasuries,
    lastMonthFarmingResults,
    latestMonth
  }
}
