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

/**
 * Convert data to be used in a line series chart, from the report balance view
 * @param data
 */
export const convertDataToLineSeries = (data: any) => {
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
