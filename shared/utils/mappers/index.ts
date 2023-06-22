import { COLORS } from '@karpatkey-monorepo/shared/config/theme'

export const reducerPositionsByProtocolAndAsset = (acc: any, obj: any) => {
  if (!acc['protocol']) acc['protocol'] = {}
  if (!acc['protocol']['lptoken_name'])
    acc['protocol']['lptoken_name'] = { funds: 0, allocation: 0, revenue: 0 }

  // 'total farming'
  if (obj['m09']) {
    acc['protocol']['lptoken_name'].funds += obj['total farming']
  }

  // 'farming rewards'
  if (obj['m14']) {
    acc['protocol']['lptoken_name'].revenue += obj['farming rewards']
  }

  return acc
}

export const reducerBalancesByTokenCategory = (
  acc: any,
  obj: any
): { funds: number; price: number }[] => {
  const assetKey = obj['token_category']

  if (!acc[assetKey]) acc[assetKey] = { funds: 0, price: 0 }

  acc[assetKey].funds =
    acc[assetKey].funds + ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
  acc[assetKey].price = +obj['next_period_first_price'] ?? 0

  return acc
}

export type MapBalancesByTokenCategory = {
  color: string
  value: string
  allocation: number
  funds: number
  price: number
}

export const mapBalancesByTokenCategory = (
  data: { funds: number; price: number }[]
): MapBalancesByTokenCategory[] => {
  const total = Object.values(data).reduce(
    (accumulator: number, value: { funds: number; price: number }) => accumulator + value.funds,
    0
  )

  return Object.keys(data).map((assetName: string, index: number) => {
    const allocation = (+data[assetName as any].funds / +total) * 100
    return {
      ...data[assetName as any],
      value: assetName,
      allocation: allocation,
      color: COLORS[index]
    }
  })
}
