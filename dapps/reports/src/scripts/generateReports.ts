/* eslint-disable @typescript-eslint/no-unused-vars */
import '@karpatkey-monorepo/reports/src/scripts/loadEnv'
import { DataWarehouse } from '@karpatkey-monorepo/reports/src/services/classes/dataWarehouse.class'
import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { FILTER_DAO, FILTER_DAOS } from '@karpatkey-monorepo/shared/config/constants'
import { summaryData } from '@karpatkey-monorepo/shared/utils/mappers/summary'
import { balanceOverviewData } from '@karpatkey-monorepo/shared/utils/mappers/balanceOverview'
import { treasuryVariationData } from '@karpatkey-monorepo/shared/utils/mappers/treasuryVariation'
import { farmingFundsData } from '@karpatkey-monorepo/shared/utils/mappers/farmingFunds'
import { tokenDetailsData } from '@karpatkey-monorepo/shared/utils/mappers/tokenDetails'

const dataWarehouse = DataWarehouse.getInstance()
const metricPeriodType = 'month'

const reportPromises = FILTER_DAOS.filter((DAO: FILTER_DAO) => DAO.isEnabled).map(
  async ({ id: DAO_ID, keyName, datesAllowed = [] }: FILTER_DAO) => {
    let reports = []
    for (const dateAllowed of datesAllowed) {
      const { month, year } = dateAllowed
      const metricPeriod = `${year}_${month}`

      const params = {
        year,
        month
      }

      const variationMetricsDetail = await dataWarehouse.getTreasuryVariationMetricsDetail(
        keyName,
        metricPeriod,
        metricPeriodType
      ) //OK
      const waterfall1Report = await dataWarehouse.getWaterfall1Report(keyName, metricPeriod)
      const financialMetricAndVarDetail = await dataWarehouse.getFinancialMetricAndVarDetail(
        keyName,
        metricPeriod,
        metricPeriodType
      )
      const financialMetricsWaterfall = await dataWarehouse.getTreasuryFinancialMetricsWaterfall(
        keyName,
        metricPeriod,
        metricPeriodType
      )
      const totalFundsByTokenCategory = await dataWarehouse.getTotalFundsByTokenCategory(
        keyName,
        metricPeriod,
        metricPeriodType
      )
      const financialPositions = await dataWarehouse.getTreasuryFinancialPositions(
        keyName,
        metricPeriod,
        metricPeriodType
      ) //OK
      const financialMetrics = await dataWarehouse.getTreasuryFinancialMetrics(
        keyName,
        metricPeriod,
        metricPeriodType
      )
      const historicVariation = await dataWarehouse.getTreasuryHistoricVariation(
        keyName,
        metricPeriod,
        metricPeriodType
      )

      // Summary block
      const summary = summaryData({
        variationMetricsDetail,
        financialMetricAndVarDetail,
        financialMetricsWaterfall,
        waterfall1Report,
        totalFundsByTokenCategory,
        financialPositions,
        financialMetrics,
        params
      })

      // Balance Overview block
      const balanceOverview = balanceOverviewData({
        variationMetricsDetail,
        params
      })

      // Treasury Variation block
      const treasuryVariation = treasuryVariationData({
        waterfall1Report,
        historicVariation,
        financialMetricsWaterfall,
        financialMetrics,
        params
      })

      // Farming Funds block
      const farmingFunds = farmingFundsData({
        waterfall1Report,
        financialPositions,
        financialMetrics,
        financialMetricsWaterfall,
        params
      })

      // Token details block
      const tokenDetails = tokenDetailsData({
        variationMetricsDetail,
        financialMetricAndVarDetail,
        params
      })

      reports.push({
        DAO_ID,
        year,
        month,
        summary,
        balanceOverview,
        treasuryVariation,
        farmingFunds,
        tokenDetails
      })
    }

    reports = reports.reduce((acc, report) => {
      const { DAO_ID, year, month } = report
      if (!acc[DAO_ID]) {
        acc[DAO_ID] = {}
      }
      if (!acc[DAO_ID][year]) {
        acc[DAO_ID][year] = {}
      }
      if (!acc[DAO_ID][year][month]) {
        acc[DAO_ID][year][month] = {}
      }
      acc[DAO_ID][year][month] = {
        summary: report.summary,
        balanceOverview: report.balanceOverview,
        treasuryVariation: report.treasuryVariation,
        farmingFunds: report.farmingFunds,
        tokenDetails: report.tokenDetails
      }
      return acc
    }, {} as any)

    return reports
  }
)

;(async () => {
  try {
    const reports = await Promise.all(reportPromises)
    const cache = Cache.getInstance()

    for (const report of reports) {
      const DAO_ID = Object.keys(report)[0]
      cache.writeFile(`${DAO_ID}`, report[DAO_ID])
    }

    console.log(`Success, cache generated!`)
  } catch (e) {
    console.error(e)
  }
})()
