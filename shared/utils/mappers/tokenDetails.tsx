export const getTokenDetails = (data: any) => {
  const rowsFiltered = data.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && row.bal_1 > 0
  })

  const rows = rowsFiltered.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      priceItemsQuantity: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      tokenCategory: string
      blockchain: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj['token_category'].replace(/[0-9][0-9] /g, '').trim()
      const blockchain = obj['blockchain'].trim()
      const tokenSymbol = obj['token_symbol'].trim()

      if (!acc[blockchain]) acc[blockchain] = {}
      if (!acc[blockchain][tokenCategory]) acc[blockchain][tokenCategory] = {}
      if (!acc[blockchain][tokenCategory][tokenSymbol])
        acc[blockchain][tokenCategory][tokenSymbol] = {
          price: 0,
          priceItemsQuantity: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          tokenCategory,
          blockchain,
          tokenSymbol
        }

      acc[blockchain][tokenCategory][tokenSymbol].price =
        acc[blockchain][tokenCategory][tokenSymbol].price +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].priceItemsQuantity =
        acc[blockchain][tokenCategory][tokenSymbol].priceItemsQuantity + 1
      acc[blockchain][tokenCategory][tokenSymbol].balance =
        acc[blockchain][tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].usdValue =
        acc[blockchain][tokenCategory][tokenSymbol].usdValue +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice =
        acc[blockchain][tokenCategory][tokenSymbol].periodFirstPrice +
        (obj['period_first_price'] ? obj['period_first_price'] : 0)

      return acc
    },
    []
  )

  const rowsFlat: any = []
  for (const blockchain in rows) {
    for (const tokenCategory in rows[blockchain]) {
      for (const tokenSymbol in rows[blockchain][tokenCategory]) {
        rowsFlat.push(rows[blockchain][tokenCategory][tokenSymbol])
      }
    }
  }

  return rowsFlat
    .map((row: any) => {
      return {
        ...row,
        price: row.price,
        priceAvg: row.price / row.priceItemsQuantity,
        priceVariation: row.nextPeriodFirstPrice / row.periodFirstPrice - 1
      }
    })
    .sort((a: any, b: any) => b.allocation - a.allocation)
}

export const getTokenDetailsGrouped = (data: any) => {
  const rowsFiltered = data.filter((row: any) => {
    return (row.metric.includes('balances') || row.metric.includes('unclaim')) && row.bal_1 > 0
  })

  const rows = rowsFiltered.reduce(
    (
      acc: any,
      obj: any
    ): {
      price: number
      priceItemsQuantity: number
      balance: number
      usdValue: number
      nextPeriodFirstPrice: number
      periodFirstPrice: number
      blockchain: string[]
      tokenCategory: string
      tokenSymbol: string
    }[][] => {
      const tokenCategory = obj['token_category'].replace(/[0-9][0-9] /g, '').trim()
      const tokenSymbol = obj['token_symbol'].trim()

      if (!acc[tokenCategory]) acc[tokenCategory] = {}
      if (!acc[tokenCategory][tokenSymbol])
        acc[tokenCategory][tokenSymbol] = {
          price: 0,
          priceItemsQuantity: 0,
          balance: 0,
          usdValue: 0,
          nextPeriodFirstPrice: 0,
          periodFirstPrice: 0,
          blockchain: [],
          tokenCategory,
          tokenSymbol
        }

      acc[tokenCategory][tokenSymbol].price =
        acc[tokenCategory][tokenSymbol].price +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[tokenCategory][tokenSymbol].priceItemsQuantity =
        acc[tokenCategory][tokenSymbol].priceItemsQuantity + 1
      acc[tokenCategory][tokenSymbol].balance =
        acc[tokenCategory][tokenSymbol].balance + (obj['bal_1'] ? obj['bal_1'] : 0)
      acc[tokenCategory][tokenSymbol].usdValue =
        acc[tokenCategory][tokenSymbol].usdValue +
        ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)
      acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice =
        acc[tokenCategory][tokenSymbol].nextPeriodFirstPrice +
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)
      acc[tokenCategory][tokenSymbol].periodFirstPrice =
        acc[tokenCategory][tokenSymbol].periodFirstPrice +
        (obj['period_first_price'] ? obj['period_first_price'] : 0)

      if (!acc[tokenCategory][tokenSymbol].blockchain.includes(obj['blockchain']))
        acc[tokenCategory][tokenSymbol].blockchain.push(obj['blockchain'])

      return acc
    },
    []
  )

  const rowsFlat: any = []

  for (const tokenCategory in rows) {
    for (const tokenSymbol in rows[tokenCategory]) {
      rowsFlat.push(rows[tokenCategory][tokenSymbol])
    }
  }

  return rowsFlat.map((row: any) => {
    return {
      ...row,
      blockchain: row.blockchain.sort((a: any, b: any) => a.localeCompare(b)).join('|'),
      price: row.price,
      priceAvg: row.price / row.priceItemsQuantity,
      priceVariation: row.nextPeriodFirstPrice / row.periodFirstPrice - 1
    }
  })
}

export const getTokenDetailByPosition = (data: any) => {
  const rowsFiltered = data.filter((row: any) => {
    return (
      ((row.metric.includes('balances') || row.metric.includes('unclaim')) &&
        !row.protocol.includes('Wallet') &&
        row.bal_1 > 0) ||
      row.metric_code === 'm21' ||
      row.metric_code === 'm22' ||
      row.metric_code === 'm23' ||
      row.metric_code === 'm24' ||
      row.metric_code === 'm25' ||
      row.metric_code === 'm26'
    )
  })

  const rows = rowsFiltered.reduce((acc: any, obj: any): any => {
    const blockchain = obj['blockchain'].trim()
    const protocol = obj['protocol'].trim()
    const position = obj['lptoken_name'].trim()

    let positionType = 'Farming Funds'
    if (obj['metric'] && obj['metric'].includes('unclaim')) {
      positionType = 'Unclaimed Rewards'
    }
    if (
      obj['metric'] &&
      obj['metric'].includes('balance') &&
      obj['protocol'] &&
      obj['protocol'].includes('Wallet')
    ) {
      positionType = 'Wallet'
    }

    if (
      obj.metric_code === 'm24' ||
      obj.metric_code === 'm23' ||
      obj.metric_code === 'm22' ||
      obj.metric_code === 'm21'
    ) {
      positionType = 'Ratios'
    }
    if (obj.metric_code === 'm25' || obj.metric_code === 'm26') {
      positionType = 'Farming Funds'
    }

    let categorize = obj['token_symbol'] && obj['token_symbol'].trim()
    if (!obj['token_symbol'] && obj['metric_code'] === 'm26') {
      categorize = 'Debt'
    }
    if (!obj['token_symbol'] && obj['metric_code'] === 'm25') {
      categorize = 'Collateral'
    }
    if (!obj['token_symbol'] && obj['metric_code'] === 'm24') {
      categorize = 'Price to drop liquidation'
    }
    if (!obj['token_symbol'] && obj['metric_code'] === 'm23') {
      categorize = 'Liquidation Price'
    }
    if (!obj['token_symbol'] && obj['metric_code'] === 'm22') {
      categorize = 'Minimum Collateral Ratio'
    }
    if (!obj['token_symbol'] && obj['metric_code'] === 'm21') {
      categorize = 'Collateral Ratio'
    }

    if (!acc[blockchain]) acc[blockchain] = {}
    if (!acc[blockchain][protocol]) acc[blockchain][protocol] = {}
    if (!acc[blockchain][protocol][position]) acc[blockchain][protocol][position] = {}
    if (!acc[blockchain][protocol][position][positionType])
      acc[blockchain][protocol][position][positionType] = {}
    if (!acc[blockchain][protocol][position][positionType][categorize])
      acc[blockchain][protocol][position][positionType][categorize] = {}

    if (position === 'Vault GNO-A') {
      console.log('obj', obj)
    }

    acc[blockchain][protocol][position][positionType][categorize] = {
      tokenBalance: 0,
      usdValue: 0,
      metricValue: 0
    }

    acc[blockchain][protocol][position][positionType][categorize].metricValue =
      acc[blockchain][protocol][position][positionType][categorize].metricValue +
      (obj['metric_value'] ? obj['metric_value'] : 0)
    acc[blockchain][protocol][position][positionType][categorize].tokenBalance =
      acc[blockchain][protocol][position][positionType][categorize].tokenBalance +
      (obj['bal_1'] ? obj['bal_1'] : 0)

    acc[blockchain][protocol][position][positionType][categorize].usdValue =
      acc[blockchain][protocol][position][positionType][categorize].usdValue +
      (obj['bal_1'] ? obj['bal_1'] : 0) *
        (obj['next_period_first_price'] ? obj['next_period_first_price'] : 0)

    return acc
  }, {})

  const cards: any[] = []
  Object.keys(rows).forEach((blockchain: string) => {
    Object.keys(rows[blockchain]).forEach((protocol: string) => {
      Object.keys(rows[blockchain][protocol]).forEach((position: string) => {
        const isMetricCard = Object.keys(rows[blockchain][protocol][position]).includes('Ratios')

        let totalUSDValue = 0
        if (!isMetricCard) {
          totalUSDValue = Object.keys(rows[blockchain][protocol][position]).reduce(
            (acc: number, metric: string) => {
              Object.keys(rows[blockchain][protocol][position][metric]).forEach(
                (categorize: string) => {
                  acc = acc + rows[blockchain][protocol][position][metric][categorize].usdValue
                }
              )
              return acc
            },
            0
          )
        } else {
          totalUSDValue = Object.keys(rows[blockchain][protocol][position]).reduce(
            (acc: number, metric: string) => {
              Object.keys(rows[blockchain][protocol][position][metric]).forEach(
                (categorize: string) => {
                  if (categorize === 'Collateral' || categorize === 'Debt') {
                    acc = acc + rows[blockchain][protocol][position][metric][categorize].metricValue
                  }
                }
              )
              return acc
            },
            0
          )
        }

        const card = {
          blockchain,
          protocol,
          position,
          totalUSDValue,
          isMetricCard,
          values: {
            ...rows[blockchain][protocol][position]
          }
        }

        cards.push(card)
      })
    })
  })

  const cardsFiltered = cards.map((card: any) => {
    if (card.isMetricCard) {
      card.values = Object.keys(card.values).reduce((acc: any, metric: string) => {
        Object.keys(card.values[metric]).forEach((categorize: string) => {
          if (
            [
              'Debt',
              'Collateral',
              'Price to drop liquidation',
              'Liquidation Price',
              'Minimum Collateral Ratio',
              'Collateral Ratio'
            ].includes(categorize)
          ) {
            acc[metric] = {
              ...acc[metric],
              [categorize]: card.values[metric][categorize]
            }
          }
        })
        return acc
      }, {})
    }
    return card
  })

  const cardsSortedByTotalUsdValue = cardsFiltered.sort((a: any, b: any) => {
    return b.totalUSDValue - a.totalUSDValue
  })

  return cardsSortedByTotalUsdValue
}

export const getWalletTokenDetails = (data: any) => {
  const rowsFiltered = data.filter((row: any) => {
    return (
      row.protocol.includes('Wallet') && row.metric.includes('balances_monthly') && row.bal_1 > 0
    )
  })

  const rows = rowsFiltered.reduce((acc: any, obj: any): any => {
    const blockchain = obj['blockchain'].trim()
    const tokenSymbol = obj['token_symbol'].trim()

    if (!acc[blockchain]) acc[blockchain] = {}
    if (!acc[blockchain][tokenSymbol]) acc[blockchain][tokenSymbol] = {}

    acc[blockchain][tokenSymbol] = {
      tokenBalance: 0,
      usdValue: 0,
      blockchain,
      tokenSymbol
    }

    acc[blockchain][tokenSymbol].tokenBalance =
      acc[blockchain][tokenSymbol].tokenBalance + (obj['bal_1'] ? obj['bal_1'] : 0)

    acc[blockchain][tokenSymbol].usdValue =
      acc[blockchain][tokenSymbol].usdValue +
      ((obj['bal_1'] ?? 0) * obj['next_period_first_price'] ?? 0)

    return acc
  }, {})

  const rowsFlat: any = []
  for (const blockchain in rows) {
    for (const tokenSymbol in rows[blockchain]) {
      rowsFlat.push(rows[blockchain][tokenSymbol])
    }
  }

  return rowsFlat
}
