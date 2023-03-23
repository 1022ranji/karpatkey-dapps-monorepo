export const TITLE = 'Karpatkey'

export const NONE = 'None'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const EthereumDAOs: DAO[] = [
  {
    address: '0x849d52316331967b6ff1198e5e32a0eb168d039d',
    name: 'Gnosis DAO',
    icon: '/images/protocols/gnosis.svg'
  },
  {
    address: '0x4971dd016127f390a3ef6b956ff944d0e2e1e462',
    name: 'Gnosis LTD',
    icon: '/images/protocols/gnosis.svg'
  },
  {
    address: '0x0efccbb9e2c09ea29551879bd9da32362b32fc89',
    name: 'Balancer',
    icon: '/images/protocols/balancer.svg'
  },
  {
    address: '0x4f2083f5fbede34c2714affb3105539775f7fe64',
    name: 'ENS',
    icon: '/images/protocols/ens.svg'
  },
  {
    address: '0x616de58c011f8736fa20c7ae5352f7f6fb9f0669',
    name: 'CoW',
    icon: '/images/protocols/cow.svg'
  },
  {
    address: '0x58e6c7ab55aa9012eacca16d1ed4c15795669e1c',
    name: 'Karpatkey',
    icon: '/images/protocols/karpatkey.svg'
  }
]

export const GnosisDAOs: DAO[] = [
  {
    address: '0x458cd345b4c05e8df39d0a07220feb4ec19f5e6f',
    name: 'Gnosis DAO',
    icon: '/images/protocols/gnosis.svg'
  },
  {
    address: '0x10e4597ff93cbee194f4879f8f1d54a370db6969',
    name: 'Gnosis LTD',
    icon: '/images/protocols/gnosis.svg'
  },
  {
    address: '0xde1d6645bdc43cb26958acbfcb5d61acd2c24ac3',
    name: 'Gnosis Guild',
    icon: '/images/protocols/gnosis.svg'
  }
]

export const DAOs: { [K in NetworkIds]: Network } = {
  0: {
    DAOs: [
      {
        address: ZERO_ADDRESS,
        name: NONE,
        icon: '/images/protocols/default.svg'
      },
      ...EthereumDAOs,
      ...GnosisDAOs
    ]
  },
  1: {
    DAOs: [
      {
        address: ZERO_ADDRESS,
        name: NONE,
        icon: '/images/protocols/default.svg'
      },
      ...EthereumDAOs
    ]
  },
  100: {
    DAOs: [
      {
        address: ZERO_ADDRESS,
        name: NONE,
        icon: '/images/protocols/default.svg'
      },
      ...GnosisDAOs
    ]
  }
}

export const BASIC_NETWORKS = {
  1: {
    name: 'Ethereum',
    icon: '/images/chains/ethereum.svg',
    explorerURL: 'https://etherscan.io/address/'
  },
  100: {
    name: 'Gnosis',
    icon: '/images/chains/gnosis.svg',
    explorerURL: 'https://gnosisscan.io/address/'
  }
}

export const NETWORKS = {
  0: {
    name: 'All networks',
    icon: '/images/chains/all.svg'
  },
  ...BASIC_NETWORKS
}

export const NETWORK_DEFAULT = 0 as NetworkId
export const DAO_DEFAULT = ZERO_ADDRESS

export const PERIOD_TYPE_DEFAULT = 'week' as PeriodType
