import { DateTime } from 'luxon'

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
  return reducerTotalFundsByProperties('protocol', 'Report_LPtoken_Name', acc, obj)
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

export const reducerTotalBalancesByAsset = (acc: any, obj: any) => {
  const assetKey = obj['token_coin_asset']

  if (!acc[assetKey]) acc[assetKey] = 0

  acc[assetKey] = acc[assetKey] + ((obj['balance'] ?? 0) * obj['price'] ?? 0)

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

export const mapDataToPie = (data: any[]) => {
  const total = Object.values(data).reduce((accumulator: any, value: any) => accumulator + value, 0)

  return Object.keys(data).map((assetName: string) => {
    const value = (data[assetName as any] / total) * 100
    const id = assetName.charAt(0).toUpperCase() + assetName.slice(1).toLowerCase()
    return {
      id,
      name: assetName,
      value: value.toFixed(2)
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