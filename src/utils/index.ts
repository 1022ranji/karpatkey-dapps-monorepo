import { getAddress } from '@ethersproject/address'
import { FILTER_DAO, FILTER_DAOS, MONTHS, NONE } from '../config/constants'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw new Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}

export const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const getMonthName = (monthNumber: number) => {
  const month = MONTHS.find((option: { label: string; short: string; id: number }) => {
    return +option.id === +monthNumber
  })

  return month
}

export const getDAOName = (daoKey: number) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => {
    return +dao.id === +daoKey
  })
  return dao?.name || NONE
}

export const getDAO = (daoKey: number | null) => {
  return FILTER_DAOS.find((dao: FILTER_DAO) => {
    return daoKey !== null && +dao.id === +daoKey
  })
}

export const isDAONameValid = (daoName: DAO_NAME) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => dao.keyName === daoName)
  return !!dao
}

export const isYearValid = (year: number) => year < 2022 || year > new Date().getFullYear()

export const isMonthValid = (month: number) => month < 1 || month > 12

export const getLatestMonthAndYear = (DAO_PARAM: Maybe<FILTER_DAO>) => {
  const DATES_ALLOWED =
    FILTER_DAOS.find((DAO) => DAO.keyName === DAO_PARAM?.keyName)?.datesAllowed || []

  const DATES_ALLOWED_SORTED = DATES_ALLOWED.sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month
    }
    return a.year - b.year
  })

  return {
    month: DATES_ALLOWED_SORTED[DATES_ALLOWED_SORTED.length - 1]?.month || null,
    year: DATES_ALLOWED_SORTED[DATES_ALLOWED_SORTED.length - 1]?.year || null
  }
}

export const getLatestMonthAndYearInCommonForEveryDAO = () => {
  // Filter out only the enabled DAOs
  const enabledDAOs = FILTER_DAOS.filter((dao: FILTER_DAO) => dao.isEnabled)

  // Get the dates allowed for each enabled DAO
  const datesAllowedArrays = enabledDAOs.map((dao: FILTER_DAO) => dao.datesAllowed) as {
    month: number
    year: number
  }[][]

  // Find the intersection of months and years
  const commonMonths =
    datesAllowedArrays.reduce((acc, curr) => {
      return acc?.filter(({ month, year }) =>
        curr?.some(({ month: m, year: y }) => m === month && y === year)
      )
    }, datesAllowedArrays[0]) ?? []

  // Get the last month and year in common
  const lastMonthAndYearInCommon = commonMonths?.reduce(
    (latest, { month, year }) => {
      if (year > latest.year || (year === latest.year && month > latest.month)) {
        return { month, year }
      }
      return latest
    },
    { month: 0, year: 0 }
  )

  return lastMonthAndYearInCommon
}

export const isProductionSite = () => {
  // check domain name for this
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'reports.karpatkey.com'
  }
  return false
}

export const isDevelopmentSite = () => {
  // check domain name for this
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'reports.karpatkey.dev'
  }
  return false
}

export const isStagingSite = () => {
  // check domain name for this
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'reports.prod.karpatkey.dev'
  }
  return false
}

export const isLocalSite = () => {
  // check domain name for this
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost'
  }
  return false
}
