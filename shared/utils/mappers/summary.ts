export const COLORS = [
  '#535353', //OK
  '#808080', //OK
  '#B6B6B6', //OK
  '#DEDEDE', //OK
  '#C0C0C0',
  '#A9A9A9',
  '#5c5c5c',
  '#383838',
  '#71797E',
  '#B2BEB5'
]

export const getSummaryFundsByTokenCategory = (data: any) => {
  const rows: { funds: number; label: string }[] = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number; label: string }[] => {
      const assetKey = obj['token_category'].replace(/[0-9][0-9] /g, '').trim()

      if (!acc[assetKey]) acc[assetKey] = { funds: 0, label: assetKey }

      acc[assetKey].funds =
        acc[assetKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[assetKey].label = assetKey

      return acc
    }, [])

  const total = Object.values(rows).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(rows)
    .map((key: string) => {
      return {
        value: key,
        allocation: (rows[key as any].funds / total) * 100,
        funds: rows[key as any].funds,
        label: rows[key as any].label
      }
    })
    .sort((a: any, b: any) => b.funds - a.funds)
    .map((row: any, index: number) => {
      return {
        ...row,
        color: COLORS[index]
      }
    })
}

export const getSummaryFundsByType = (data: any) => {
  const rows: { funds: number; label: string }[] = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number; label: string }[] => {
      const metric = obj['metric'].trim()
      const protocol = obj['protocol'].trim()
      const metricKey = metric.includes('unclaimed_rewards')
        ? 'Unclaimed rewards'
        : metric.includes('balance') && protocol.includes('Wallet')
        ? 'Wallet'
        : 'Farming funds'

      if (!acc[metricKey]) acc[metricKey] = { funds: 0, label: metricKey }

      acc[metricKey].funds =
        acc[metricKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[metricKey].label = metricKey

      return acc
    }, [])

  const total = Object.values(rows).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(rows)
    .map((key: string) => {
      return {
        value: key,
        allocation: (rows[key as any].funds / total) * 100,
        funds: rows[key as any].funds,
        label: rows[key as any].label
      }
    })
    .sort((a: any, b: any) => b.funds - a.funds)
    .map((row: any, index: number) => {
      return {
        ...row,
        color: COLORS[index]
      }
    })
}

export const getSummaryFundsByBlockchain = (data: any) => {
  const rows: { funds: number; label: number }[] = data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): { funds: number; label: number }[] => {
      const blockchain = obj['blockchain'].trim()

      if (!acc[blockchain]) acc[blockchain] = { funds: 0, label: blockchain }

      acc[blockchain].funds =
        acc[blockchain].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[blockchain].label = blockchain

      return acc
    }, [])

  const total = Object.values(rows).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(rows)
    .map((key: string) => {
      return {
        value: key,
        allocation: (rows[key as any].funds / total) * 100,
        funds: rows[key as any].funds,
        label: rows[key as any].label
      }
    })
    .sort((a: any, b: any) => b.funds - a.funds)
    .map((row: any, index: number) => {
      return {
        ...row,
        color: COLORS[index]
      }
    })
}

export const getSummaryFundsByProtocol = (data: any) => {
  const rows: { funds: number; label: number }[] = data.reduce(
    (acc: any, obj: any): { funds: number; label: number }[] => {
      const protocol = obj['protocol'].trim()

      if (!acc[protocol]) acc[protocol] = { funds: 0, label: protocol }

      acc[protocol].funds = acc[protocol].funds + (obj['Funds'] ?? 0)
      acc[protocol].label = protocol

      return acc
    },
    []
  )

  const total = Object.values(rows).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(rows)
    .map((key: string) => {
      return {
        value: key,
        allocation: (rows[key as any].funds / total) * 100,
        funds: rows[key as any].funds,
        label: rows[key as any].label
      }
    })
    .sort((a: any, b: any) => b.funds - a.funds)
    .map((row: any, index: number) => {
      return {
        ...row,
        color: COLORS[index] ? COLORS[index] : COLORS[Math.floor(Math.random() * 9) + 0]
      }
    })
}

export const getTotalFunds = (data: any) => {
  return data
    .filter((row: any) => {
      return row.metric.includes('balances') || row.metric.includes('unclaim')
    })
    .reduce((acc: any, obj: any): number => {
      acc = acc + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      return acc
    }, 0)
}

export const getCapitalUtilization = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj['metric'] === 'capital utilization' ? obj['metric_value'] : 0
    acc = acc + value
    return acc
  }, 0)
}

export const getFarmingResults = (data: any) => {
  return data.reduce((acc: any, obj: any): number => {
    const value = obj['metric_code'] === 'm09' ? obj['metric_value'] : 0 // TODO the value is not OK, URI
    acc = acc + value
    return acc
  }, 0)
}
