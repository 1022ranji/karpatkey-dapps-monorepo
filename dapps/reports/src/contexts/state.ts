export enum Status {
  Loading = 'Loading',
  Finished = 'Finished'
}

export const initialState = {
  DAO: null,
  year: null,
  month: null,
  dashboard: null,
  report: null
} as InitialState

export type Metrics = {
  nonCustodialAum: number
  lastMonthDeFiResults: number
  ourDaoTreasuries: number
  month: number
  year: number
}

export type DAOResume = {
  name: string
  keyName: string
  icon: string
  shouldBeDisplayedHomepage: boolean
  isEnabled: boolean
  totalFunds: number
  allocatedFunds: number
  deFiResults: number
  APY: number
  urlToReport: string
}

export type SummaryType = {
  value: string
  allocation: number
  funds: number
  label: string
  color: number
}

export type TreasuryVariationType = {
  funds: number
  value: string
  key: number
  uv: number
  pv: number
}

export type TreasuryVariationForThePeriodDetailDataType = {
  shortedValue: string
} & TreasuryVariationType

export type Report = {
  summary: {
    totalFunds: number
    allocatedFunds: number
    deFiResults: number
    APY: number
    fundsByTokenCategory: SummaryType[]
    fundsByType: SummaryType[]
    fundsByBlockchain: SummaryType[]
    fundsByProtocol: SummaryType[]
  }
  balanceOverview: {
    balanceOverviewType: {
      'Token Category': string
      'Farming funds': number
      'Unclaimed rewards': number
      Wallet: number
      Total: number
    }[]
    balanceOverviewBlockchain: {
      funds: number
      row: string
      column: string
    }[]
  }
  treasuryVariation: {
    treasuryVariationData: TreasuryVariationType[]
    historicVariationData: TreasuryVariationType[]
    treasuryVariationForThePeriodDetailData: TreasuryVariationForThePeriodDetailDataType[]
  }
  farmingFunds: {
    deFiResults: number
    farmingFundsByProtocol: {
      funds: number
      allocation: number
      unclaimed: number
      results: number
      blockchain: string
      protocol: string
      position: string
    }[]
    totalFarmingResultsFarmSwaps: number
    farmingResultsDetailsByProtocol: {
      rewards: number
      fees: number
      total: number
      blockchain: string
      protocol: string
      position: string
    }[]
    operationDetails: {
      blockchain: string
      protocol: string
      position: string
      operationsFunds: number
      funds: number
      allocation: number
      operationResults: number
      priceVariation: number
    }[]
  }
  tokenDetails: {
    tokenDetails: {
      price: number
      priceItemsQuantity: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      tokenCategory: string
      blockchain: string
      tokenSymbol: string
      priceAvg: number
      priceVariation: number
    }[]
    tokenDetailsGrouped: {
      price: number
      priceItemsQuantity: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      tokenCategory: string
      blockchain: string
      tokenSymbol: string
      priceAvg: number
      priceVariation: number
    }[]
    tokenDetailByPosition: {
      blockchain: string
      protocol: string
      position: string
      deFiType: string
      cardType: string
      categories: {
        name: string
        tokens: Maybe<
          {
            symbol: string
            balance: number
            usdValue: number
          }[]
        >
        ratios: Maybe<
          {
            name: string
            value: number
          }[]
        >
      }
    }[]
    totalUsdValue: number
  }
  walletTokenDetail: {
    tokenBalance: number
    usdValue: number
    blockchain: string
    tokenSymbol: string
  }[]
}

export type Dashboard = {
  metrics: Metrics
  daoResume: DAOResume[]
}

export type InitialState = {
  DAO: Maybe<number>
  year: Maybe<number>
  month: Maybe<number>
  dashboard: Maybe<Dashboard>
  report: Maybe<Report>
}
