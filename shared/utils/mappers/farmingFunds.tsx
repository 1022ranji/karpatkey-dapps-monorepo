export const getFarmingFundsTotal = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj['metric'] === 'total farming' ? obj['metric_value'] : 0
    acc += value
    return acc
  }, 0)
}

export const getFarmingFundsByProtocol = (data: any) => {
  const rows = data.reduce((acc: any, obj: any) => {
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
    const value = obj['metric_code'] === 'm20' ? obj['metric_value'] : 0
    acc += value
    return acc
  }, 0)
}

export const getFarmingResultsDetailsByProtocol = (data: any) => {
  const rows = data
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

  return Object.keys(rows).reduce((result: any, protocol: string) => {
    Object.keys(rows[protocol]).forEach((position: string) => {
      result.push(rows[protocol][position])
    })
    return result
  }, [])
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
