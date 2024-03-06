import { getAddress } from '@ethersproject/address'
import { FILTER_DAO, FILTER_DAOS, MONTHS, NONE } from '../config/constants'

import { AutocompleteOption } from '../components/CustomAutocomplete'

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
  const month = MONTHS.find((option: AutocompleteOption) => {
    return +option.id === +monthNumber
  })

  return month?.label
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
  const DATES_ALLOWED = FILTER_DAOS.map((DAO) => DAO.datesAllowed).flat()

  const DATES_ALLOWED_SORTED = DATES_ALLOWED.sort((a: any, b: any) => {
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

export const isProductionCheckingDomainName = () => {
  // TODO: remove this when filter refactor is ready
  const domainName = window.location.hostname
  // TODO: this should be done with an env variable
  const isProduction = domainName.includes('reports.karpatkey.com')
  return isProduction
}
