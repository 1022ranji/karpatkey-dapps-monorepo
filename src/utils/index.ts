import { DateTime } from 'luxon'

export const getLastWeekDate = () => {
  return DateTime.local().minus({ days: 7 }).toMillis()
}

export const getTodayDate = () => {
  return DateTime.local().endOf('day').toMillis()
}
