/* eslint-disable @typescript-eslint/no-unused-vars */
import './loadEnv'
import { DataWarehouse } from 'src/services/classes/dataWarehouse.class'
import Cache from 'src/services/classes/cache.class'
import { FILTER_DAO, FILTER_DAOS } from 'src/config/constants'
import { summaryData } from 'src/utils/mappers/summary'
import { balanceOverviewData } from 'src/utils/mappers/balanceOverview'
import { treasuryVariationData } from 'src/utils/mappers/treasuryVariation'
import { farmingFundsData } from 'src/utils/mappers/farmingFunds'
import { tokenDetailsData } from 'src/utils/mappers/tokenDetails'

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
      const waterfall1ReportETH = await dataWarehouse.getWaterfall1ReportETH(keyName, metricPeriod)

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
      const financialMetricsWaterfallETH =
        await dataWarehouse.getTreasuryFinancialMetricsWaterfallETH(
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
      )
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
      const historicVariationETH = await dataWarehouse.getTreasuryHistoricVariationETH(
        keyName,
        metricPeriod,
        metricPeriodType
      )
      const variationMetricsDetailV2 = await dataWarehouse.getTreasuryVariationMetricsDetailV2(
        keyName,
        metricPeriod,
        metricPeriodType
      )

      const tokenDetailV2 = await dataWarehouse.getTokenDetail(
        keyName,
        metricPeriod,
        metricPeriodType
      )

      // Summary block DONE
      const summary = summaryData({
        variationMetricsDetail,
        financialMetricAndVarDetail,
        financialMetricsWaterfall,
        waterfall1Report,
        waterfall1ReportETH,
        totalFundsByTokenCategory,
        financialPositions,
        financialMetrics,
        params
      })

      // Balance Overview block DONE
      const balanceOverview = balanceOverviewData({
        variationMetricsDetail,
        params
      })

      // Treasury Variation block
      const treasuryVariation = treasuryVariationData({
        waterfall1Report,
        waterfall1ReportETH,
        historicVariation,
        historicVariationETH,
        financialMetricsWaterfall,
        financialMetricsWaterfallETH,
        financialMetrics,
        params
      })

      // Farming Funds block
      const farmingFunds = farmingFundsData({
        financialPositions,
        financialMetricsWaterfall,
        params
      })

      // Token details block
      const tokenDetails = tokenDetailsData({
        variationMetricsDetail,
        financialMetricAndVarDetail,
        variationMetricsDetailV2,
        params
      })

      reports.push({
        DAO_ID,
        year,
        month,
        ETH: {
          summary: summary.ETH,
          balanceOverview: balanceOverview.ETH,
          treasuryVariation: treasuryVariation.ETH,
          farmingFunds: farmingFunds.ETH,
          tokenDetails: tokenDetails.ETH
        },
        USD: {
          summary: summary.USD,
          balanceOverview: balanceOverview.USD,
          treasuryVariation: treasuryVariation.USD,
          farmingFunds: farmingFunds.USD,
          tokenDetails: tokenDetails.USD
        }
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
        ETH: report['ETH'],
        USD: report['USD']
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
