import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

export const getBalanceOverviewByType = (data: any, params: any) => {
  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rowsUSD = data.filter((row: any) => {
    return row.metric.includes('balances') || row.metric.includes('unclaim')
  })

  let balanceOverviewUSD
  let balanceOverviewETH
  // Balance overview USD
  if (!isDDay) {
    rowsUSD = rowsUSD.reduce((acc: any, obj: any): { funds: number }[][] => {
      const metric = obj?.metric?.trim()
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const protocol = obj?.protocol.trim()
      const metricKey = metric.includes('unclaim')
        ? 'Unclaimed rewards'
        : metric.includes('balance') && protocol.includes('Wallet')
        ? 'Wallet'
        : 'Farming funds'

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][metricKey])
        acc[tokenCategory][metricKey] = { funds: 0, row: tokenCategory, column: metricKey }
      acc[tokenCategory][metricKey].funds =
        acc[tokenCategory][metricKey].funds +
        ((obj?.bal_1 ?? 0) * obj?.next_period_first_price ?? 0)

      return acc
    }, [])

    balanceOverviewUSD = Object.keys(rowsUSD)
      .map((key: string) => {
        const farmingFunds = rowsUSD[key as any]['Farming funds' as any]?.funds ?? 0
        const unclaimedRewards = rowsUSD[key as any]['Unclaimed rewards' as any]?.funds ?? 0
        const wallet = rowsUSD[key as any]['Wallet' as any]?.funds ?? 0
        const total = farmingFunds + unclaimedRewards + wallet
        return {
          'Token Category': key,
          'Farming funds': farmingFunds,
          'Unclaimed rewards': unclaimedRewards,
          Wallet: wallet,
          Total: total
        }
      })
      .sort((a: any, b: any) => b.Total - a.Total)
  } else {
    rowsUSD = rowsUSD.reduce((acc: any, obj: any): { funds: number }[][] => {
      const metric = obj?.metric?.trim()
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const protocol = obj?.protocol.trim()
      const nonfarmingPosition = obj?.nonfarming_position?.trim()

      const metricKey =
        metric.includes('balance') && protocol.includes('Wallet')
          ? 'Wallet'
          : nonfarmingPosition === 'TRUE'
          ? 'Operations funds'
          : nonfarmingPosition === 'FALSE'
          ? 'DeFi funds'
          : metric

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][metricKey])
        acc[tokenCategory][metricKey] = { funds: 0, row: tokenCategory, column: metricKey }
      acc[tokenCategory][metricKey].funds =
        acc[tokenCategory][metricKey].funds +
        ((obj?.bal_1 ?? 0) * obj?.next_period_first_price ?? 0)

      return acc
    }, [])

    balanceOverviewUSD = Object.keys(rowsUSD)
      .map((key: string) => {
        const defiFunds = rowsUSD[key as any]['DeFi funds' as any]?.funds ?? 0
        const operationsFunds = rowsUSD[key as any]['Operations funds' as any]?.funds ?? 0
        const wallet = rowsUSD[key as any]['Wallet' as any]?.funds ?? 0
        const total = defiFunds + operationsFunds + wallet
        return {
          'Token Category': key,
          'DeFi funds': defiFunds,
          'Operations funds': operationsFunds,
          Wallet: wallet,
          Total: total
        }
      })
      .sort((a: any, b: any) => b.Total - a.Total)
  }

  let rowsETH = data.filter((row: any) => {
    return row.metric.includes('balances') || row.metric.includes('unclaim')
  })
  // Balance overview ETH
  if (!isDDay) {
    rowsETH = rowsETH.reduce((acc: any, obj: any): { funds: number }[][] => {
      const metric = obj?.metric?.trim()
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const protocol = obj?.protocol.trim()
      const metricKey = metric.includes('unclaim')
        ? 'Unclaimed rewards'
        : metric.includes('balance') && protocol.includes('Wallet')
        ? 'Wallet'
        : 'Farming funds'

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][metricKey])
        acc[tokenCategory][metricKey] = { funds: 0, row: tokenCategory, column: metricKey }
      acc[tokenCategory][metricKey].funds =
        acc[tokenCategory][metricKey].funds +
        (obj?.bal_1 ?? 0) *
          ((obj?.next_period_first_price ?? 0) / obj?.eth_next_month_first_price ?? 1)

      return acc
    }, [])

    balanceOverviewETH = Object.keys(rowsETH)
      .map((key: string) => {
        const farmingFunds = rowsETH[key as any]['Farming funds' as any]?.funds ?? 0
        const unclaimedRewards = rowsETH[key as any]['Unclaimed rewards' as any]?.funds ?? 0
        const wallet = rowsETH[key as any]['Wallet' as any]?.funds ?? 0
        const total = farmingFunds + unclaimedRewards + wallet
        return {
          'Token Category': key,
          'Farming funds': farmingFunds,
          'Unclaimed rewards': unclaimedRewards,
          Wallet: wallet,
          Total: total
        }
      })
      .sort((a: any, b: any) => b.Total - a.Total)
  } else {
    rowsETH = rowsETH.reduce((acc: any, obj: any): { funds: number }[][] => {
      const metric = obj?.metric?.trim()
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const protocol = obj?.protocol.trim()
      const nonfarmingPosition = obj?.nonfarming_position?.trim()

      const metricKey =
        metric.includes('balance') && protocol.includes('Wallet')
          ? 'Wallet'
          : nonfarmingPosition === 'TRUE'
          ? 'Operations funds'
          : nonfarmingPosition === 'FALSE'
          ? 'DeFi funds'
          : metric

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][metricKey])
        acc[tokenCategory][metricKey] = { funds: 0, row: tokenCategory, column: metricKey }
      acc[tokenCategory][metricKey].funds =
        acc[tokenCategory][metricKey].funds +
        (obj?.bal_1 ?? 0) *
          ((obj?.next_period_first_price ?? 0) / obj?.eth_next_month_first_price ?? 1)

      return acc
    }, [])

    balanceOverviewETH = Object.keys(rowsETH)
      .map((key: string) => {
        const defiFunds = rowsETH[key as any]['DeFi funds' as any]?.funds ?? 0
        const operationsFunds = rowsETH[key as any]['Operations funds' as any]?.funds ?? 0
        const wallet = rowsETH[key as any]['Wallet' as any]?.funds ?? 0
        const total = defiFunds + operationsFunds + wallet
        return {
          'Token Category': key,
          'DeFi funds': defiFunds,
          'Operations funds': operationsFunds,
          Wallet: wallet,
          Total: total
        }
      })
      .sort((a: any, b: any) => b.Total - a.Total)
  }

  return {
    balanceOverviewUSD,
    balanceOverviewETH
  }
}

export const getBalanceOverviewByBlockchain = (data: any) => {
  const rowsUSD = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const blockchain = obj?.blockchain?.trim()

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][blockchain])
        acc[tokenCategory][blockchain] = { funds: 0, row: tokenCategory, column: blockchain }
      acc[tokenCategory][blockchain].funds =
        acc[tokenCategory][blockchain].funds +
        ((obj?.bal_1 ?? 0) * obj?.next_period_first_price ?? 0)

      return acc
    }, [])

  const balanceOverviewUSD = Object.keys(rowsUSD).reduce((acc: any, key: string) => {
    const row = rowsUSD[key as any]
    Object.keys(row).forEach((key: string) => {
      acc.push(row[key])
    })
    return acc
  }, [])

  const rowsETH = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number }[][] => {
      const tokenCategory = obj?.token_category?.replace(/[0-9][0-9] /g, '')?.trim()
      const blockchain = obj?.blockchain?.trim()

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][blockchain])
        acc[tokenCategory][blockchain] = { funds: 0, row: tokenCategory, column: blockchain }
      acc[tokenCategory][blockchain].funds =
        acc[tokenCategory][blockchain].funds +
        (obj?.bal_1 ?? 0) *
          ((obj?.next_period_first_price ?? 0) / obj?.eth_next_month_first_price ?? 1)
      return acc
    }, [])

  const balanceOverviewETH = Object.keys(rowsETH).reduce((acc: any, key: string) => {
    const row = rowsETH[key as any]
    Object.keys(row).forEach((key: string) => {
      acc.push(row[key])
    })
    return acc
  }, [])

  return {
    balanceOverviewUSD,
    balanceOverviewETH
  }
}

export const balanceOverviewData = ({ variationMetricsDetail, params }: any) => {
  // Funds by token category / Type
  const balanceOverviewType = getBalanceOverviewByType(variationMetricsDetail, params)

  // Funds by token category / Blockchain
  const balanceOverviewBlockchain = getBalanceOverviewByBlockchain(variationMetricsDetail)

  return {
    ETH: {
      balanceOverviewType: balanceOverviewType.balanceOverviewETH,
      balanceOverviewBlockchain: balanceOverviewBlockchain.balanceOverviewETH
    },
    USD: {
      balanceOverviewType: balanceOverviewType.balanceOverviewUSD,
      balanceOverviewBlockchain: balanceOverviewBlockchain.balanceOverviewUSD
    }
  }
}
