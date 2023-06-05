export const TITLE = 'karpatkey'

export const NONE = 'None'

export const ALLOWED_REPORTS: { reportName: Report; fileName: string }[] = [
  {
    reportName: 'getDailyBalanceReports',
    fileName: 'daily-balance-reports'
  },
  {
    reportName: 'getTreasuryFinancialMetrics',
    fileName: 'treasury-financial-metrics'
  },
  {
    reportName: 'getTokens',
    fileName: 'tokens'
  },
  {
    reportName: 'getTreasuryVariationMetricsDetail',
    fileName: 'treasury-variation-metrics-detail'
  },
  {
    reportName: 'getTreasuryFinancialPositions',
    fileName: 'treasury-financial-positions'
  },
  {
    reportName: 'getTreasuryHistoricVariation',
    fileName: 'treasury-historic-variation'
  }
]

export type CHAIN = {
  id: number
  name: string
  short: string
  explorer: string
  logo: string
}

export type DAO_ADDRESS = {
  address: string
  chainId: number
}

export interface FILTER_DAO {
  id: number
  name: string
  icon: string
  keyName: DAO_NAME
  sinceMonth: number
  sinceYear: number
  addresses: DAO_ADDRESS[]
}

export const CHAINS: CHAIN[] = [
  {
    id: 1,
    name: 'Ethereum',
    short: 'eth',
    explorer: 'https://etherscan.io/address',
    logo: '/images/chains/ethereum.svg'
  },
  {
    id: 100,
    name: 'Gnosis Chain',
    short: 'gno',
    explorer: 'https://gnosisscan.io/address',
    logo: '/images/chains/gnosis.svg'
  }
]

export const enum DAO_NAME_KEY {
  'Gnosis DAO' = 0,
  'Gnosis LTD' = 1,
  'Balancer DAO' = 2,
  'ENS DAO' = 3,
  'CoW DAO' = 4,
  'karpatkey DAO' = 5,
  'Gnosis Guild' = 6
}

export const FILTER_DAOS: FILTER_DAO[] = [
  {
    id: DAO_NAME_KEY['Gnosis DAO'],
    name: 'Gnosis DAO',
    icon: '/images/protocols/gnosis.svg',
    keyName: 'Gnosis DAO',
    sinceMonth: 4,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x849d52316331967b6ff1198e5e32a0eb168d039d',
        chainId: 1
      },
      {
        address: '0x458cd345b4c05e8df39d0a07220feb4ec19f5e6f',
        chainId: 100
      }
    ]
  },
  {
    id: DAO_NAME_KEY['Balancer DAO'],
    name: 'Balancer',
    icon: '/images/protocols/balancer.svg',
    keyName: 'Balancer DAO',
    sinceMonth: 4,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x0efccbb9e2c09ea29551879bd9da32362b32fc89',
        chainId: 1
      }
    ]
  },
  {
    id: DAO_NAME_KEY['ENS DAO'],
    name: 'ENS',
    icon: '/images/protocols/ens.svg',
    keyName: 'ENS DAO',
    sinceMonth: 4,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
        chainId: 1
      }
    ]
  },
  {
    id: DAO_NAME_KEY['CoW DAO'],
    name: 'CoW',
    icon: '/images/protocols/cow.svg',
    keyName: 'CoW DAO',
    sinceMonth: 4,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 1
      },
      {
        address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
        chainId: 100
      }
    ]
  },
  {
    id: DAO_NAME_KEY['karpatkey DAO'],
    name: 'karpatkey',
    icon: '/images/protocols/karpatkey.svg',
    keyName: 'karpatkey DAO',
    sinceMonth: 4,
    sinceYear: 2023,
    addresses: [
      {
        address: '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c',
        chainId: 1
      },
      {
        address: '0x54e191B01aA9C1F61AA5C3BCe8d00956F32D3E71',
        chainId: 100
      }
    ]
  }
]
