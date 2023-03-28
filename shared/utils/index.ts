import { getAddress } from '@ethersproject/address'
import {
  BASIC_NETWORKS,
  DAOs,
  NETWORKS,
  NONE,
  ZERO_ADDRESS
} from '@karpatkey-monorepo/shared/config/constants'
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

export const getHumanPeriodType = (periodType: PeriodType) => {
  switch (periodType) {
    case 'day':
      return 'Daily'
    case 'week':
      return 'Weekly'
    case 'month':
      return 'Monthly'
    case 'year':
      return 'Yearly'
    default:
      return ''
  }
}

export const getHumanPeriod = (period: string, periodType: PeriodType) => {
  switch (periodType) {
    case 'day':
      return DateTime.fromISO(period).toFormat('yyyy-MM-dd')
    case 'week':
      return DateTime.fromISO(period).toFormat('yyyy-WW')
    case 'month':
      return DateTime.fromISO(period).toFormat('yyyy-MM')
    case 'year':
      return DateTime.fromISO(period).toFormat('yyyy')
    default:
      return ''
  }
}

export const getHumanDAO = (address: string, networkId: NetworkId) => {
  const dao = DAOs[networkId].DAOs.find((dao) => dao.address === address)
  return dao ? dao.name : NONE
}

export const getHumanNetwork = (networkId: NetworkId) => {
  return NETWORKS[networkId].name
}

export const getDAOsForDropdownByNetwork = (networkId: NetworkIds) => {
  return DAOs[networkId].DAOs.map((dao) => ({
    value: dao.address,
    name: dao.name,
    icon: dao.icon
  })).sort((a, b) => a.name.localeCompare(b.name))
}

export const getNetworksForDropdown = () => {
  return Object.entries(NETWORKS)
    .map(([key, value]) => ({
      value: key,
      name: value.name,
      icon: value.icon
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

export const getNetworkByNetworkId = (networkId: NetworkId) => {
  return NETWORKS[networkId]
}

export const getDAOByAddress = (address: string, networkId: NetworkId) => {
  return DAOs[networkId].DAOs.find((dao) => dao.address.toLowerCase() === address.toLowerCase())
}

export const getNetworkNameByDAOAddress = (address: string) => {
  const network = Object.entries(BASIC_NETWORKS).find(([key]) => {
    return DAOs[key as unknown as NetworkId].DAOs.some((dao: any) => dao.address === address)
  })
  return network ? network[1].name : NONE
}

export const getNetworkExplorerURLByDAOAddress = (address: string) => {
  const network = Object.entries(BASIC_NETWORKS).find(([key]) => {
    return DAOs[key as unknown as NetworkId].DAOs.some((dao: any) => dao.address === address)
  })
  return network ? `${network[1].explorerURL}${address}` : NONE
}

export const existAddressInDAOs = (address: string, networkId: NetworkId) => {
  return DAOs[networkId].DAOs.some((dao) => dao.address === address)
}

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

export const isDefaultAddress = (address: string) => {
  return address === ZERO_ADDRESS
}

export const getMetricByPeriodType = (periodType: PeriodType) => {
  switch (periodType) {
    case 'day':
      return 'balances_daily'
    case 'week':
      return 'balances_weekly'
    case 'month':
      return 'balances_monthly'
    case 'year':
      return 'balances_yearly'
    default:
      return ''
  }
}

export const getMetricByPeriod = (period: string, periodType: PeriodType) => {
  switch (periodType) {
    case 'day':
      return DateTime.fromISO(period).toFormat('yyyy-MM-dd')
    case 'week':
      return DateTime.fromISO(period).toFormat('yyyy_WW')
    case 'month':
      return DateTime.fromISO(period).toFormat('yyyy_MM')
    case 'year':
      return DateTime.fromISO(period).toFormat('yyyy')
    default:
      return ''
  }
}
