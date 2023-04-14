import { getAddress } from '@ethersproject/address'
import { DAOs, NETWORKS, NONE, ZERO_ADDRESS } from '@karpatkey-monorepo/shared/config/constants'
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

export const getHumanPeriodType = (periodType: TPeriodType) => {
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

export const getHumanPeriod = (period: string, periodType: TPeriodType) => {
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

export const getDAOsForDropdown = () => {
  return Object.values(DAOs)
    .map((value: INetwork) => {
      return value.DAOs.map((dao) => ({
        keyName: dao.keyName,
        name: dao.name,
        icon: dao.icon
      }))
    })
    .flat()
    .reduce(
      (
        accumulator: { keyName: TDAO_Name; name: string; icon: string }[],
        current: { keyName: TDAO_Name; name: string; icon: string }
      ) => {
        if (!accumulator.find((item) => item.keyName === current.keyName)) {
          accumulator.push(current)
        }
        return accumulator
      },
      []
    )
    .sort((a, b) => a.name.localeCompare(b.name))
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

export const getNetworkByNetworkId = (networkId: TNetworkId) => {
  return NETWORKS[networkId]
}

export const getDAOByAddress = (address: string) => {
  const dao = Object.values(DAOs).find((network) =>
    network.DAOs.find((dao) => dao.addresses.includes(address))
  )
  return dao?.DAOs.find((dao) => dao.addresses.includes(address))
}

export const getDAOByDAOName = (daoName: TDAO_Name) => {
  const dao = Object.values(DAOs).find((network) =>
    network.DAOs.find((dao) => dao.keyName === daoName)
  )
  return dao?.DAOs.find((dao) => dao.keyName === daoName)
}

export const getNetworkExplorerURLByDAOAddress = (daoName: TDAO_Name) => {
  const network = Object.entries(DAOs).find(([, value]) => {
    return value.DAOs.some((dao) => dao.keyName === daoName)
  })
  const dao = getDAOByDAOName(daoName)

  return network
    ? `${NETWORKS[network[0] as unknown as TNetworkId].explorerURL}${dao?.addresses[0]}`
    : NONE
}

export const existDAOKeyName = (daoName: TDAO_Name) => {
  return Object.values(DAOs).some((network) => network.DAOs.some((dao) => dao.keyName === daoName))
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

export const getMetricByPeriodType = (periodType: TPeriodType) => {
  switch (periodType) {
    case 'day':
      return '_daily'
    case 'week':
      return '_weekly'
    case 'month':
      return '_monthly'
    case 'year':
      return '_yearly'
    default:
      return ''
  }
}

export const getDateTypeByPeriodType = (periodType: TPeriodType) => {
  switch (periodType) {
    case 'day':
      return 'day'
    case 'week':
      return 'week'
    case 'month':
      return 'month'
    case 'year':
      return 'year'
    default:
      return ''
  }
}

export const getMetricByPeriod = (period: string, periodType: TPeriodType) => {
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

export const getAddressByDAOName = (daoName: TDAO_Name) => {
  const dao = Object.values(DAOs).find((network) =>
    network.DAOs.find((dao) => dao.keyName === daoName)
  )
  return dao?.DAOs.find((dao) => dao.keyName === daoName)?.addresses[0] || ZERO_ADDRESS
}

export const getNameByDAOName = (daoName: TDAO_Name) => {
  const dao = Object.values(DAOs).find((network) =>
    network.DAOs.find((dao) => dao.keyName === daoName)
  )
  return dao?.DAOs.find((dao) => dao.keyName === daoName)?.name || NONE
}
