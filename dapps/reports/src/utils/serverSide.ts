import Cache from '@karpatkey-monorepo/reports/src/services/classes/cache.class'
import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import {
  getDAOByDAOName,
  getDateTypeByPeriodType,
  getMetricByPeriodType
} from '@karpatkey-monorepo/shared/utils/'
import {
  mapBalancesByTokenCategory,
  mapperBalanceOverviewBlockchain,
  mapperBalanceOverviewType,
  mapperFarmingFundsByProtocol,
  mapperFundsByBlockchain,
  mapperFundsByProtocol,
  mapperFundsByTokenCategory,
  mapperFundsByType,
  reducerBalanceOverviewBlockchain,
  reducerBalanceOverviewType,
  reducerBalancesByTokenCategory,
  reducerCapitalUtilization,
  reducerFarmingFundsByProtocol,
  reducerFarmingResults,
  reducerFundsByBlockchain,
  reducerFundsByProtocol,
  reducerFundsByTokenCategory,
  reducerFundsByType,
  reducerTotalFarmingFunds,
  reducerTotalFunds,
  reducerTreasuryHistoricVariation,
  reducerTreasuryVariationForThePeriod,
  reducerTreasuryVariationForThePeriodDetail
} from '@karpatkey-monorepo/shared/utils//mappers'

// TODO try to reduce the size of this function in some way
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
  // Funds by token category / Type
  const rowsBalanceOverviewType = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerBalanceOverviewType, [])

  const balanceOverviewType = mapperBalanceOverviewType(rowsBalanceOverviewType).sort(
    (a: any, b: any) => b.funds - a.funds
  )

  // Funds by token category / Blockchain
  const rowsBalanceOverviewBlockchain = variationMetricsDetailFiltered
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce(reducerBalanceOverviewBlockchain, [])

  const balanceOverviewBlockchain = mapperBalanceOverviewBlockchain(
    rowsBalanceOverviewBlockchain
  ).sort((a: any, b: any) => b.funds - a.funds)

  // Treasury variation
  // For the period
  const valuesForThePeriod: any[] = []
  const rowsTreasuryVariation = financialMetricsFiltered
    .filter((row: any) => {
      return (
        row.metric === 'total farming' ||
        row.metric === 'non farming ops' ||
        row.metric === 'usd initial balance & UR' ||
        row.metric === 'usd final balance'
      )
    })
    .reduce(reducerTreasuryVariationForThePeriod, [])
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThePeriod[index] = {
        uv: row.funds,
        pv: index === 0 ? 0 : valuesForThePeriod[index - 1].pv + valuesForThePeriod[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThePeriod[index - 1].pv + valuesForThePeriod[index - 1].uv
      }
    })

  // In this year
  const valuesForThisYear: any[] = []
  const rowsHistoricVariation = historicVariationFiltered
    .filter((row: any) => {
      return (
        row.metric.includes('Initial Balance') ||
        row.metric.includes('NonFarming Results') ||
        row.metric.includes('Farming Results')
      )
    })
    .reduce(reducerTreasuryHistoricVariation, [])
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThisYear[index] = {
        uv: row.funds,
        pv: index === 0 ? 0 : valuesForThisYear[index - 1].pv + valuesForThisYear[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThisYear[index - 1].pv + valuesForThisYear[index - 1].uv
      }
    })

  const rowsHistoricVariationTotal = rowsHistoricVariation.reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  rowsHistoricVariation.push({
    funds: rowsHistoricVariationTotal,
    value: 'Final Balance',
    key: 4,
    uv: rowsHistoricVariationTotal,
    pv: 0
  })

  // For the period, detail
  const valuesForThePeriodDetail: any[] = []
  const rowsTreasuryVariationForThePeriodDetail = financialMetricsFiltered
    .filter((row: any) => {
      return (
        row.metric === 'non farming price variation' ||
        row.metric === 'usd initial balance & UR' ||
        row.metric === 'nonfarming_swap' ||
        row.metric === 'nonfarming_outcome' ||
        row.metric === 'nonfarming_income' ||
        row.metric === 'farming rewards' ||
        row.metric === 'farming token variation' ||
        row.metric === 'farming price variation' ||
        row.metric === 'farming executed only swaps' ||
        row.metric === 'nonfarming_bridge'
      )
    })
    .reduce(reducerTreasuryVariationForThePeriodDetail, [])
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThePeriodDetail[index] = {
        uv: row.funds,
        pv:
          index === 0
            ? 0
            : valuesForThePeriodDetail[index - 1].pv + valuesForThePeriodDetail[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0
            ? 0
            : valuesForThePeriodDetail[index - 1].pv + valuesForThePeriodDetail[index - 1].uv
      }
    })

  const rowsTreasuryVariationForThePeriodDetailTotal =
    rowsTreasuryVariationForThePeriodDetail.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

  rowsTreasuryVariationForThePeriodDetail.push({
    funds: rowsTreasuryVariationForThePeriodDetailTotal,
    value: 'Final Balance',
    shortedValue: 'FB',
    key: 12,
    uv: rowsTreasuryVariationForThePeriodDetailTotal,
    pv: 0
  })

  // Farming Funds / Results
  // Farming result block
  const totalFarmingFunds = financialMetricsFiltered.reduce(reducerTotalFarmingFunds, 0)

  // Farming funds / Results by protocol
  const rowsFarmingFundsByProtocolReduced = financialPositionsFiltered.reduce(
    reducerFarmingFundsByProtocol,
    []
  )

  const rowsFarmingFundsByProtocolFlat = Object.values(rowsFarmingFundsByProtocolReduced).reduce(
    (acc: any, curVal: any) => {
      return acc.concat(Object.values(curVal))
    },
    []
  )
  const rowsFarmingFundsByProtocol = mapperFarmingFundsByProtocol(
    rowsFarmingFundsByProtocolFlat as any[]
  ).sort((a: any, b: any) => b.funds - a.funds)

  const rowsFarmingFundsByProtocolTotals = rowsFarmingFundsByProtocol.reduce(
    (
      accumulator: { fundsTotal: number; unclaimedTotal: number; resultsTotal: number },
      currentValue: { funds: number; unclaimed: number; results: number }
    ) => {
      return {
        fundsTotal: accumulator.fundsTotal + currentValue.funds,
        unclaimedTotal: accumulator.unclaimedTotal + currentValue.unclaimed,
        resultsTotal: accumulator.resultsTotal + currentValue.results
      }
    },
    { fundsTotal: 0, unclaimedTotal: 0, resultsTotal: 0 }
  )

  // Farming results details by protocol
  const financialMetricsFilteredByMetric = financialMetricsFiltered
    .filter((row: any) => {
      return (
        row.protocol !== 'Wallet' &&
        (row.metric === 'farming rewards' || row.metric === 'farming token variation')
      )
    })
    .reduce((acc: any, obj: any) => {
      const protocol = obj['protocol'].trim()
      const position = obj['lptoken_name'].trim()
      const metric = obj['metric'].trim()

      if (!acc[protocol]) acc[protocol] = {}
      if (!acc[protocol][position])
        acc[protocol][position] = {
          rewards: 0,
          fees: 0,
          total: 0,
          protocol,
          position
        }

      acc[protocol][position].rewards += metric === 'farming rewards' ? obj['metric_value'] : 0
      acc[protocol][position].fees += metric === 'farming token variation' ? obj['metric_value'] : 0
      acc[protocol][position].total = acc[protocol][position].rewards + acc[protocol][position].fees

      return acc
    }, [])

  const rowsFarmingResultsDetailsByProtocol = Object.keys(financialMetricsFilteredByMetric).reduce(
    (result: any, protocol: string) => {
      Object.keys(financialMetricsFilteredByMetric[protocol]).forEach((position: string) => {
        result.push(financialMetricsFilteredByMetric[protocol][position])
      })
      return result
    },
    []
  )

  const rowsFarmingResultsDetailsByProtocolTotals = rowsFarmingResultsDetailsByProtocol.reduce(
    (
      accumulator: { rewardsTotal: number; feesTotal: number; total: number },
      currentValue: { rewards: number; fees: number; total: number }
    ) => {
      return {
        rewardsTotal: accumulator.rewardsTotal + currentValue.rewards,
        feesTotal: accumulator.feesTotal + currentValue.fees,
        total: accumulator.total + currentValue.total
      }
    },
    { rewardsTotal: 0, feesTotal: 0, total: 0 }
  )

  // Temp
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
