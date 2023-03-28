import { TReportFilter } from '@karpatkey-monorepo/reports/src/types'
import Cache from '@karpatkey-monorepo/shared/services/classes/cache.class'

import { getDAOByAddress, getMetricByPeriod, getMetricByPeriodType } from './index'
import { mapBalancesByTokenCategory, reducerBalancesByTokenCategory } from './mappers'

export const getCommonServerSideProps = async (params: TReportFilter) => {
  const { chainId, periodType, period, daoAddress } = params

  // Step 1: Create a BigQuery client
  const cache = Cache.getInstance()

  // Step 2: Query the data
  const rows = await cache.getReport('getTreasuryVariationMetricsDetail')

  const { keyName } = getDAOByAddress(daoAddress, chainId) || {}
  const metricPeriodType = getMetricByPeriodType(periodType)
  const metricPeriod = getMetricByPeriod(period, periodType)

  const rowsFiltered = rows.filter((row: any) => {
    return row.metric === metricPeriodType && row.dao === keyName && row.year_month === metricPeriod
  })

  const rowsReduced = rowsFiltered.reduce(reducerBalancesByTokenCategory, [])

  const data = mapBalancesByTokenCategory(rowsReduced)
  return { data }
}
