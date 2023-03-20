declare type Maybe<T> = T | null

type ComponentProps = {
  children?: React.ReactNode
}

type NetworkId = 1 | 100

enum NetworkIds {
  ETHEREUM = 1,
  GNOSIS = 100,
}

interface DAO {
  address: string
  name: string
}

interface Network {
  DAOs: DAO[]
}

enum PeriodTime {
  YEAR = 'year',
  WEEK = 'week',
  MONTH = 'month',
  DAY = 'day'
}

type PeriodType = `${PeriodTime}`
