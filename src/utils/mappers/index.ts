/**
 * Filter data between two timestamps, from the report balance view
 * @param data
 * @param startDateTime
 * @param endDateTime
 */
export const filterByRangeOfDates = (data: any[], startDateTime: number, endDateTime: number) => {
  return data.filter((item: any) => {
    const dateKey = item['kitche_date'].value
    const dateKeyTime = new Date(dateKey).getTime()
    return dateKeyTime >= startDateTime && dateKeyTime <= endDateTime
  })
}

/**
 * Get total balance by date, from the report balance view
 * @param acc
 * @param obj
 */
export const reducerTotalBalancesByDate = (acc: any, obj: any) => {
  const daoKey = obj['dao']
  const dateKey = obj['kitche_date'].value

  if (!acc[daoKey]) acc[daoKey] = {}
  if (!acc[daoKey][dateKey]) acc[daoKey][dateKey] = []
  acc[daoKey][dateKey] = {
    total: (acc[daoKey][dateKey].total ?? 0) + ((obj['balance'] ?? 0) * obj['price'] ?? 0)
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
          y: data[daoName][date].total
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
