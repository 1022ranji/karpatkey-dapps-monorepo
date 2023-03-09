import Cache from '@/shared/services/classes/cache.class'
import { filterByRangeOfDates } from '@/shared/utils/mappers'
import { DateTime } from 'luxon'

export const getLastWeekDate = () => {
  return DateTime.local().minus({ days: 7 }).toMillis()
}

export const getTodayDate = () => {
  return DateTime.local().endOf('day').toMillis()
}

export const getCommonServerSideProps = (): any[] => {
  // Step 1: Create a cache instance and obtain the data
  const cache = Cache.getInstance()
  const reportData = cache.getBalanceReports()

  // Step 2: Filter the data by date range and DAO
  const startDateTime = getLastWeekDate()
  const endDateTime = getTodayDate()

  return filterByRangeOfDates(reportData, startDateTime, endDateTime)
    .filter((item: any) => item['dao'] === 'Karpatkey')
    .sort((a: any, b: any) => {
      const aDate = a['kitche_date'].value
      const bDate = b['kitche_date'].value
      return DateTime.fromISO(aDate).toUTC().toMillis() - DateTime.fromISO(bDate).toUTC().toMillis()
    })
}
