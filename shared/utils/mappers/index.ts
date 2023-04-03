import { DateTime } from 'luxon'
import randomColor from 'randomcolor'

/**
 * Filter data between two timestamps, from the report balance view
 * @param data
 * @param startDateTime
 * @param endDateTime
 */
export const filterByRangeOfDates = (data: any[], startDateTime: number, endDateTime: number) => {
  return data.filter((item: any) => {
    const dateKey = item['kitche_date'].value
    const dateKeyTime = DateTime.fromISO(dateKey).toUTC().toMillis()
    return dateKeyTime >= startDateTime && dateKeyTime <= endDateTime
  })
}

/**
 * Get total balance by date, from the report balance view
 * @param acc
 * @param obj
 */
export const reducerTotalBalancesByDate = (acc: any, obj: any) => {
  return reducerTotalFundsByProperties('dao', 'kitche_date', acc, obj)
}

export const reducerPositionsByProtocolAndAsset = (acc: any, obj: any) => {
  if (!acc['protocol']) acc['protocol'] = {}
  if (!acc['protocol']['lptoken_name'])
    acc['protocol']['lptoken_name'] = { funds: 0, allocation: 0, revenue: 0 }

  // 'total farming'
  if (obj['m09']) {
    acc['protocol']['lptoken_name'].funds += obj['total farming']
  }

  // 'farming rewards'
  if (obj['m14']) {
    acc['protocol']['lptoken_name'].revenue += obj['farming rewards']
  }

  return acc
}

const reducerTotalFundsByProperties = (
  propertyOne: string,
  propertyTwo: string,
  acc: any,
  obj: any
) => {
  const propertyOneKey = obj[propertyOne]
  const propertyTwoKey = propertyTwo.includes('date') ? obj[propertyTwo].value : obj[propertyTwo]

  if (!acc[propertyOneKey]) acc[propertyOneKey] = {}
  if (!acc[propertyOneKey][propertyTwoKey]) acc[propertyOneKey][propertyTwoKey] = {}
  acc[propertyOneKey][propertyTwoKey] = {
    totalFunds:
      (acc[propertyOneKey][propertyTwoKey].totalFunds ?? 0) +
      ((obj['balance'] ?? 0) * obj['price'] ?? 0)
  }

  return acc
}

export const reducerBalancesByTokenCategory = (
  acc: any,
  obj: any
): { funds: number; price: number }[] => {
  const assetKey = obj['token_category']

  if (!acc[assetKey]) acc[assetKey] = { funds: 0, price: 0 }

  acc[assetKey].funds =
    acc[assetKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  acc[assetKey].price = +obj['next_period_first_price'] ?? 0

  return acc
}

export const reducerFundsByTokenCategory = (
  acc: any,
  obj: any
): { funds: number; label: string }[] => {
  const assetKey = obj['token_category'].trim()

  if (!acc[assetKey]) acc[assetKey] = { funds: 0, label: assetKey }

  acc[assetKey].funds =
    acc[assetKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  acc[assetKey].label = assetKey

  return acc
}

export const mapperFundsByTokenCategory = (
  data: { funds: number; label: string }[]
): { fill: string; value: string; allocation: number; funds: number; label: string }[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(data).map((key: string) => {
    return {
      fill: randomColor(),
      value: key,
      allocation: (data[key as any].funds / total) * 100,
      funds: data[key as any].funds,
      label: data[key as any].label
    }
  })
}

export const reducerFundsByType = (acc: any, obj: any): { funds: number; price: number }[] => {
  const metric = obj['metric'].trim()
  const protocol = obj['protocol'].trim()
  const metricKey = metric.includes('unclaimed_rewards')
    ? 'Unclaimed Rewards'
    : metric.includes('balance') && protocol.includes('Wallet')
    ? 'Wallet'
    : 'Farming Funds'

  if (!acc[metricKey]) acc[metricKey] = { funds: 0, label: metricKey }

  acc[metricKey].funds =
    acc[metricKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  acc[metricKey].label = metricKey

  return acc
}

export const mapperFundsByType = (
  data: { funds: number; label: string }[]
): { fill: string; value: string; allocation: number; funds: number; label: string }[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(data).map((key: string) => {
    return {
      fill: randomColor(),
      value: key,
      allocation: (data[key as any].funds / total) * 100,
      funds: data[key as any].funds,
      label: data[key as any].label
    }
  })
}

export const reducerFundsByBlockchain = (
  acc: any,
  obj: any
): { funds: number; label: number }[] => {
  const blockchain = obj['blockchain'].trim()

  if (!acc[blockchain]) acc[blockchain] = { funds: 0, label: blockchain }

  acc[blockchain].funds =
    acc[blockchain].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  acc[blockchain].label = blockchain

  return acc
}

export const mapperFundsByBlockchain = (
  data: { funds: number; label: string }[]
): { fill: string; value: string; allocation: number; funds: number; label: string }[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(data).map((key: string) => {
    return {
      fill: randomColor(),
      value: key,
      allocation: (data[key as any].funds / total) * 100,
      funds: data[key as any].funds,
      label: data[key as any].label
    }
  })
}

export const reducerFundsByProtocol = (acc: any, obj: any): { funds: number; label: number }[] => {
  const protocol = obj['protocol'].trim()

  if (!acc[protocol]) acc[protocol] = { funds: 0, label: protocol }

  acc[protocol].funds = acc[protocol].funds + (obj['Funds'] ?? 0)
  acc[protocol].label = protocol

  return acc
}

export const mapperFundsByProtocol = (
  data: { funds: number; label: string }[]
): { fill: string; value: string; allocation: number; funds: number; label: string }[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
    0
  )

  return Object.keys(data).map((key: string) => {
    return {
      fill: randomColor(),
      value: key,
      allocation: (data[key as any].funds / total) * 100,
      funds: data[key as any].funds,
      label: data[key as any].label
    }
  })
}

export const reducerTotalFunds = (acc: any, obj: any): number => {
  acc = acc + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  return acc
}

export const reducerCapitalUtilization = (acc: any, obj: any): number => {
  acc = acc + (obj['metric'] && obj['metric'] === 'capital utilization' ? obj['metric_value'] : 0)
  return acc
}

export const reducerFarmingResults = (acc: any, obj: any): number => {
  acc = acc + (obj['metric'] && obj['metric'] === 'total farming' ? obj['metric_value'] : 0)
  return acc
}

/**
 * Convert data to be used in a line series chart, from the report balance view
 * @param data
 */
export const mapDataToLineSeries = (data: any) => {
  return Object.keys(data).map((daoName: string) => {
    return {
      id: daoName,
      data: Object.keys(data[daoName]).map((date: string) => {
        return {
          x: date,
          y: data[daoName][date].totalFunds
        }
      })
    }
  })
}

export type TMapBalancesByTokenCategory = {
  fill: string
  value: string
  allocation: number
  funds: number
  price: number
}

export const mapBalancesByTokenCategory = (
  data: { funds: number; price: number }[]
): TMapBalancesByTokenCategory[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, value: { funds: number; price: number }) => accumulator + value.funds,
    0
  )

  const colours = randomColor({
    hue: 'monochrome',
    count: Object.keys(data).length,
    luminosity: 'light'
  })

  return Object.keys(data).map((assetName: string, index: number) => {
    const allocation = (+data[assetName as any].funds / +total) * 100
    return {
      ...data[assetName as any],
      value: assetName,
      allocation: allocation,
      fill: colours[index]
    }
  })
}

export const mapDataToTable = (data: any[]) => {
  const totalFunds = Object.values(data).reduce((totalFunds: any, assetsByProtocol: any) => {
    const totalFundsByProtocol = Object.values(assetsByProtocol).reduce(
      (acc: any, val: any) => acc + val.totalFunds,
      0
    )
    return totalFunds + totalFundsByProtocol
  }, 0)

  const TBD = 'TBD'
  const res = []
  for (const protocol in data) {
    const asset = data[protocol]
    for (const assetName in asset) {
      const assetData = asset[assetName]
      res.push({
        description: TBD,
        protocol: protocol,
        assets: assetName,
        funds: assetData.totalFunds,
        allocation: (assetData.totalFunds * 100) / totalFunds,
        currentAPR: TBD,
        previousAPR: TBD,
        weeklyRevenue: TBD,
        yearEstRevenue: TBD
      })
    }
  }
  return res
}
