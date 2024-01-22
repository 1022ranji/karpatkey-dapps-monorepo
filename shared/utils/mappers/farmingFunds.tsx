import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

export const getFarmingFundsTotal = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj['metric'] === 'total farming' ? obj['metric_value'] : 0
    acc += value
    return acc
  }, 0)
}

export const getDeFiFundsTotal = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj?.waterfall_metric === '03 DeFi results' ? obj?.metric_value : 0
    acc += value
    return acc
  }, 0)
}

export const getOperationDetails = (data: any) => {
  const rows = data
    .filter((row: any) => {
      return row?.nonfarming_position === 'TRUE'
    })
    .map((item: any) => {
      const position =
        item?.Assets === 'Delegated MKR-Lend&Borrow Collateral' ? 'Delegated MKR' : item?.Assets

      return {
        blockchain: item?.blockchain,
        protocol: item?.protocol,
        position,
        operationsFunds: item?.funds_UR ?? 0,
        funds: item?.Funds ?? 0,
        allocation: 0,
        operationResults: item?.Revenue ?? 0,
        priceVariation: item?.Price_variation_for_initial_balance ?? 0
      }
    })

  const total = rows.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.funds,
    0
  )

  rows.forEach((row: any) => {
    row.allocation = row.funds / total
  })

  return rows.sort((a: any, b: any) => b.funds - a.funds)
}

export const getFarmingFundsByProtocol = (data: any, params: any) => {
  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rows = []

  if (isDDay) {
    rows = data
      .filter((row: any) => {
        return row?.nonfarming_position === 'FALSE'
      })
      .reduce((acc: any, obj: any) => {
        const blockchain = obj['blockchain'].trim()
        const protocol = obj['protocol'].trim()
        const position = obj['Assets'].trim()
        if (!acc[blockchain]) acc[blockchain] = {}
        if (!acc[blockchain][protocol]) acc[blockchain][protocol] = {}
        if (!acc[blockchain][protocol][position])
          acc[blockchain][protocol][position] = {
            funds: 0,
            allocation: 0,
            unclaimed: 0,
            results: 0,
            blockchain,
            protocol,
            position
          }

        // 'total farming'
        acc[blockchain][protocol][position].funds += obj['funds_UR']
        acc[blockchain][protocol][position].results += obj['Revenue']

        return acc
      }, [])
  } else {
    rows = data.reduce((acc: any, obj: any) => {
      const blockchain = obj['blockchain'].trim()
      const protocol = obj['protocol'].trim()
      const position = obj['Assets'].trim()
      if (!acc[blockchain]) acc[blockchain] = {}
      if (!acc[blockchain][protocol]) acc[blockchain][protocol] = {}
      if (!acc[blockchain][protocol][position])
        acc[blockchain][protocol][position] = {
          funds: 0,
          allocation: 0,
          unclaimed: 0,
          results: 0,
          blockchain,
          protocol,
          position
        }

      // 'total farming'
      acc[blockchain][protocol][position].funds += obj['Funds']
      acc[blockchain][protocol][position].unclaimed += obj['Unclaimed_Rewards']
      acc[blockchain][protocol][position].results += obj['Revenue']

      return acc
    }, [])
  }

  const rowsFlat: any = []
  for (const blockchain in rows) {
    for (const protocol in rows[blockchain]) {
      for (const position in rows[blockchain][protocol]) {
        rowsFlat.push(rows[blockchain][protocol][position])
      }
    }
  }

  const total = rowsFlat.reduce(
    (accumulator: number, currentValue: any) => accumulator + currentValue.funds,
    0
  )

  return rowsFlat
    .map((value: any) => {
      return {
        ...value,
        allocation: (value.funds / total) * 100
      }
    })
    .sort((a: any, b: any) => b.funds - a.funds)
}

export const getFarmingFundsByProtocolTotals = (data: any) => {
  return data.reduce(
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
}

export const getFarmingResultsFarmSwapsTotal = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj?.metric === 'farming executed only swaps' ? obj['metric_value'] : 0
    acc += value
    return acc
  }, 0)
}

export const getFarmingResultsDetailsByProtocol = (data: any) => {
  const rows = data
    .filter((row: any) => {
      return row.protocol !== 'Wallet' && (row.metric_code === 'm14' || row.metric_code === 'm15')
    })
    .reduce((acc: any, obj: any) => {
      const blockchain = obj['blockchain'].trim()
      const protocol = obj['protocol'].trim()
      const position = obj['lptoken_name'].trim()
      const metric_code = obj['metric_code'].trim()

      if (!acc[blockchain]) acc[blockchain] = {}
      if (!acc[blockchain][protocol]) acc[blockchain][protocol] = {}
      if (!acc[blockchain][protocol][position])
        acc[blockchain][protocol][position] = {
          rewards: 0,
          fees: 0,
          total: 0,
          blockchain,
          protocol,
          position
        }

      const rewards = metric_code === 'm14' ? obj['metric_value'] : 0
      const fees = metric_code === 'm15' ? obj['metric_value'] : 0

      acc[blockchain][protocol][position].rewards += rewards
      acc[blockchain][protocol][position].fees += fees
      acc[blockchain][protocol][position].total =
        acc[blockchain][protocol][position].rewards + acc[blockchain][protocol][position].fees

      return acc
    }, [])

  const rowsFlat: any = []
  for (const blockchain in rows) {
    for (const protocol in rows[blockchain]) {
      for (const position in rows[blockchain][protocol]) {
        if (blockchain && protocol) {
          rowsFlat.push(rows[blockchain][protocol][position])
        }
      }
    }
  }

  return rowsFlat
    .filter((row: any) => row.total < -0.5 || row.total > 0.5)
    .sort((a: any, b: any) => b.total - a.total)
}

export const getFarmingResultsDetailsByProtocolTotals = (data: any) => {
  return data.reduce(
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
}

export const getOperationsDetailTotals = (data: any) => {
  return data.reduce(
    (
      accumulator: {
        operationsFundsTotal: number
        allocationTotal: number
        operationResultsTotal: number
        priceVariationTotal: number
      },
      currentValue: {
        operationsFunds: number
        allocation: number
        operationResults: number
        priceVariation: number
      }
    ) => {
      return {
        operationsFundsTotal: accumulator.operationsFundsTotal + currentValue.operationsFunds,
        allocationTotal: accumulator.allocationTotal + currentValue.allocation,
        operationResultsTotal: accumulator.operationResultsTotal + currentValue.operationResults,
        priceVariationTotal: accumulator.priceVariationTotal + currentValue.priceVariation
      }
    },
    {
      operationsFundsTotal: 0,
      allocationTotal: 0,
      operationResultsTotal: 0,
      priceVariationTotal: 0
    }
  )
}

export const farmingFundsData = ({
  waterfall1Report,
  financialPositions,
  financialMetrics,
  financialMetricsWaterfall,
  params
}: any) => {
  // Allocated funds by protocol
  const farmingFundsByProtocol = getFarmingFundsByProtocol(financialPositions, params)

  // DeFi results, not used anymore
  const deFiResults = getDeFiFundsTotal(waterfall1Report)

  // DeFi results from DeFi-Swaps
  const totalFarmingResultsFarmSwaps = getFarmingResultsFarmSwapsTotal(financialMetricsWaterfall)

  // Operations details
  const operationDetails = getOperationDetails(financialPositions)

  // DeFi funds/results by position
  const farmingResultsDetailsByProtocol = getFarmingResultsDetailsByProtocol(financialMetrics)

  return {
    deFiResults,
    farmingFundsByProtocol,
    totalFarmingResultsFarmSwaps,
    farmingResultsDetailsByProtocol,
    operationDetails
  }
}
