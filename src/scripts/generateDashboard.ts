/* eslint-disable @typescript-eslint/no-unused-vars */
import './loadEnv'
import { DataWarehouse } from 'src/services/classes/dataWarehouse.class'
import Cache from 'src/services/classes/cache.class'
import { getLatestMonthAndYearInCommonForEveryDAO } from 'src/utils'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'
import {
  getCapitalUtilization,
  getFarmingResults,
  getGlobalROI,
  getTotalFunds
} from 'src/utils/mappers/summary'

const dataWarehouse = DataWarehouse.getInstance()

const metricPeriodType = 'month'
const { month, year } = getLatestMonthAndYearInCommonForEveryDAO()
const metricPeriod = `${year}_${month}`

const getDAOResume = async ({
  variationMetricsDetail,
  financialMetricAndVarDetail,
  waterfall1Report,
  waterfall1ReportETH,
  financialMetrics,
  DAO_ID,
  month,
  year
}: any) => {
  const totalFunds = getTotalFunds(variationMetricsDetail)
  const allocatedFunds = getCapitalUtilization(financialMetrics)
  const deFiResults = getFarmingResults(waterfall1Report, waterfall1ReportETH, financialMetrics, {
    year,
    month
  })

  const APY = getGlobalROI(financialMetricAndVarDetail)

  const urlToReport = `?dao=${DAO_ID}&month=${month}&year=${year}`

  const shouldBeETH = FILTER_DAOS.find(
    (DAO: FILTER_DAO) => DAO.id === DAO_ID
  )?.shouldBeIncludedDashboardTwo

  return {
    totalFunds: shouldBeETH ? totalFunds.totalFundsETH : totalFunds.totalFundsUSD,
    allocatedFunds,
    deFiResults: shouldBeETH ? deFiResults.deFiResultsETH : deFiResults.deFiResultsUSD,
    APY,
    urlToReport
  }
}

const daoResumePromises = FILTER_DAOS.filter((DAO: FILTER_DAO) => DAO.isEnabled).map(
  async ({
    id: DAO_ID,
    name,
    icon,
    keyName,
    shouldBeIncludedDashboardOne,
    shouldBeIncludedDashboardTwo,
    shouldBeIncludedNCAum,
    shouldBeIncludedLastMonthDeFiResults,
    isEnabled
  }: FILTER_DAO) => {
    const variationMetricsDetail = await dataWarehouse.getTreasuryVariationMetricsDetail(
      keyName,
      metricPeriod,
      metricPeriodType
    )
    const waterfall1Report = await dataWarehouse.getWaterfall1Report(keyName, metricPeriod)
    const waterfall1ReportETH = await dataWarehouse.getWaterfall1ReportETH(keyName, metricPeriod)
    const financialMetricAndVarDetail = await dataWarehouse.getFinancialMetricAndVarDetail(
      keyName,
      metricPeriod,
      metricPeriodType
    )
    const financialMetrics = await dataWarehouse.getTreasuryFinancialMetrics(
      keyName,
      metricPeriod,
      metricPeriodType
    )

    const daoResume = await getDAOResume({
      variationMetricsDetail,
      financialMetricAndVarDetail,
      waterfall1Report,
      waterfall1ReportETH,
      financialMetrics,
      DAO_ID,
      month,
      year
    })
    return {
      name,
      keyName,
      icon,
      shouldBeIncludedDashboardOne,
      shouldBeIncludedDashboardTwo,
      shouldBeIncludedNCAum,
      shouldBeIncludedLastMonthDeFiResults,
      isEnabled,
      ...daoResume
    }
  }
)

;(async () => {
  try {
    const daoResume = await Promise.all(daoResumePromises)

    const nonCustodialAum = daoResume.reduce((acc, item) => {
      if (!item.shouldBeIncludedNCAum) return acc
      return acc + item.totalFunds
    }, 0)

    const lastMonthDeFiResults = daoResume.reduce((acc, dao) => {
      if (!dao.shouldBeIncludedLastMonthDeFiResults) return acc
      return acc + dao.deFiResults
    }, 0)
    const daoResumeSorted = daoResume.sort((a, b) => {
      if (a.keyName === 'karpatkey DAO') return 1
      if (b.keyName === 'karpatkey DAO') return -1
      return b.totalFunds - a.totalFunds
    })

    const dataWarehouse = DataWarehouse.getInstance()
    const ourDaoTreasuriesData = await dataWarehouse.getOurDAOTreasury()
    const ourDaoTreasuries = ourDaoTreasuriesData.length > 0 ? ourDaoTreasuriesData[0].value : 0

    const dashboard = {
      metrics: {
        nonCustodialAum,
        lastMonthDeFiResults,
        ourDaoTreasuries,
        month,
        year
      },
      daoResume: daoResumeSorted
    }

    const cache = Cache.getInstance()
    cache.writeFile('dashboard', dashboard)

    console.log(`Success, cache generated!`)
  } catch (e) {
    console.error(e)
  }
})()
