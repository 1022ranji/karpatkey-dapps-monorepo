/* eslint-disable @typescript-eslint/no-unused-vars */
import '@karpatkey-monorepo/reports/src/scripts/loadEnv'
import { DataWarehouse } from '@karpatkey-monorepo/reports/src/services/classes/dataWarehouse.class'
import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import {
  getLatestMonthAndYear,
  getLatestMonthAndYearInCommonForEveryDAO
} from '@karpatkey-monorepo/shared/utils'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import {
  getCapitalUtilization,
  getFarmingResults,
  getGlobalROI,
  getTotalFunds
} from '@karpatkey-monorepo/shared/utils/mappers/summary'

const dataWarehouse = DataWarehouse.getInstance()

const metricPeriodType = 'month'
const { month, year } = getLatestMonthAndYearInCommonForEveryDAO()
const metricPeriod = `${year}_${month}`

const getDAOResume = async ({
  variationMetricsDetail,
  financialMetricsWaterfall,
  financialMetricAndVarDetail,
  waterfall1Report,
  financialMetrics,
  DAO_ID,
  month,
  year
}: any) => {
  const totalFunds = getTotalFunds(variationMetricsDetail)
  const allocatedFunds = getCapitalUtilization(financialMetrics)
  const deFiResults = getFarmingResults(waterfall1Report, financialMetrics, { year, month })

  const APY = getGlobalROI(financialMetricAndVarDetail)

  const urlToReport = `?dao=${DAO_ID}&month=${month}&year=${year}`

  return {
    totalFunds,
    allocatedFunds,
    deFiResults,
    APY,
    urlToReport
  }
}

const daoResumePromises = FILTER_DAOS.filter(
  (DAO: FILTER_DAO) => DAO.isEnabled && DAO.shouldBeDisplayedHomepage
).map(
  async ({ id: DAO_ID, name, icon, keyName, shouldBeDisplayedHomepage, isEnabled }: FILTER_DAO) => {
    const variationMetricsDetail = await dataWarehouse.getTreasuryVariationMetricsDetail(
      keyName,
      metricPeriod,
      metricPeriodType
    )
    const waterfall1Report = await dataWarehouse.getWaterfall1Report(keyName, metricPeriod)
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
    const financialMetricsWaterfall = await dataWarehouse.getTreasuryFinancialMetricsWaterfall(
      keyName,
      metricPeriod,
      metricPeriodType
    )

    const daoResume = await getDAOResume({
      variationMetricsDetail,
      financialMetricAndVarDetail,
      financialMetricsWaterfall,
      waterfall1Report,
      financialMetrics,
      DAO_ID,
      month,
      year
    })
    return {
      name,
      keyName,
      icon,
      shouldBeDisplayedHomepage,
      isEnabled,
      ...daoResume
    }
  }
)

;(async () => {
  try {
    const daoResume = await Promise.all(daoResumePromises)

    const nonCustodialAum = daoResume.reduce((acc, item) => acc + item.totalFunds, 0)
    const lastMonthDeFiResults = daoResume.reduce((acc, dao) => acc + dao.deFiResults, 0)
    // sort daoResume by total funds, but keep the item with keyName equal to "karpatkey DAO" at the last item
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
