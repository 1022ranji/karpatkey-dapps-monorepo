import { getAddress } from '@ethersproject/address'
import { FILTER_DAO, FILTER_DAOS, NONE } from '@karpatkey-monorepo/shared/config/constants'

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
  const date = new Date()
  date.setMonth(monthNumber - 1)

  return date.toLocaleString([], {
    month: 'long'
  })
}

export const getDAOName = (daoKey: number) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => {
    return +dao.id === +daoKey
  })
  return dao?.name || NONE
}

export const getDAO = (daoKey: number) => {
  return FILTER_DAOS.find((dao: FILTER_DAO) => {
    return +dao.id === +daoKey
  })
}

export const isDAONameValid = (daoName: DAO_NAME) => {
  const dao = FILTER_DAOS.find((dao: FILTER_DAO) => dao.keyName === daoName)
  return !!dao
}

export const isYearValid = (year: number) => year < 2022 || year > new Date().getFullYear()

export const isMonthValid = (month: number) => month < 1 || month > 12
