import Cache from '@/shared/services/classes/cache.class'
import { filterByRangeOfDates } from '@/shared/utils/mappers'
import { DateTime } from 'luxon'

export const getLastWeekDate = () => {
  return DateTime.local().minus({ days: 7 }).toMillis()
}

export const getEndTodayDate = () => {
  return DateTime.local().endOf('day').toMillis()
}

export const getStartTodayDate = () => {
  return DateTime.local().startOf('day').toMillis()
}

export const getCommonServerSideProps = (params: { daily?: boolean; daoName: string }): any[] => {
  const { daily = false, daoName } = params
  // Step 1: Create a cache instance and obtain the data
  const cache = Cache.getInstance()
  const reportData = cache.getBalanceReports()

  // Step 2: Filter the data by date range and DAO
  const startDateTime = daily ? getStartTodayDate() : getLastWeekDate()
  const endDateTime = getEndTodayDate()

  return filterByRangeOfDates(reportData, startDateTime, endDateTime)
    .filter((item: any) => item['dao'] === daoName)
    .sort((a: any, b: any) => {
      const aDate = a['kitche_date'].value
      const bDate = b['kitche_date'].value
      return DateTime.fromISO(aDate).toMillis() - DateTime.fromISO(bDate).toMillis()
    })
}
