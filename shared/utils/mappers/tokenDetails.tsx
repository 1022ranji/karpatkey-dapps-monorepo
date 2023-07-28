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
        !row.protocol.includes('Wallet')) ||
      row.metric_code === 'm21' ||
      row.metric_code === 'm22' ||
      row.metric_code === 'm23' ||
      row.metric_code === 'm24' ||
      row.metric_code === 'm25' ||
      row.metric_code === 'm26'
    )
  })

  const commonCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const tokenSymbol = obj.token_symbol && obj.token_symbol.trim()
      const position = obj.lptoken_name.trim()

      if (!tokenSymbol || position.includes('Vault')) {
        return acc
      }

      const blockchain = obj.blockchain.trim()
      const protocol = obj.protocol.trim()

      let categoryName = 'Farming Funds'
      if (obj.metric && obj.metric.includes('unclaim')) {
        categoryName = 'Unclaimed Rewards'
      }
      if (
        obj.metric &&
        obj.metric.includes('balance') &&
        obj.protocol &&
        obj.protocol.includes('Wallet')
      ) {
        categoryName = 'Wallet'
      }

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain && card.protocol === protocol && card.position === position
        )
      })

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === categoryName
        })

        if (categoryFound) {
          categoryFound.tokens.push({
            symbol: tokenSymbol,
            balance: obj.bal_1 ? obj.bal_1 : 0,
            usdValue:
              (obj.bal_1 ? obj.bal_1 : 0) *
              (obj.next_period_first_price ? obj.next_period_first_price : 0)
          })
        } else {
          cardFound.categories.push({
            name: categoryName,
            tokens: [
              {
                symbol: tokenSymbol,
                balance: obj.bal_1 ? obj.bal_1 : 0,
                usdValue:
                  (obj.bal_1 ? obj.bal_1 : 0) *
                  (obj.next_period_first_price ? obj.next_period_first_price : 0)
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          cardType: 'common',
          categories: [
            {
              name: categoryName,
              tokens: [
                {
                  symbol: tokenSymbol,
                  balance: obj.bal_1 ? obj.bal_1 : 0,
                  usdValue:
                    (obj.bal_1 ? obj.bal_1 : 0) *
                    (obj.next_period_first_price ? obj.next_period_first_price : 0)
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const metricsCards = rowsFiltered.reduce((acc: any, obj: any): any => {
    const metricCode = obj?.metric_code?.trim()

    if (
      metricCode !== 'm24' &&
      metricCode !== 'm23' &&
      metricCode !== 'm22' &&
      metricCode !== 'm21'
    ) {
      return acc
    }

    const blockchain = obj?.blockchain?.trim()
    const protocol = obj?.protocol?.trim()
    const position = obj?.lptoken_name?.trim()

    const positionType = 'Ratios'

    let ratioName = ''
    if (!obj.token_symbol && obj.metric_code === 'm24') {
      ratioName = 'Collateral Price drop to liquidation'
    }
    if (!obj.token_symbol && obj.metric_code === 'm23') {
      ratioName = 'Collateral Liquidation Price'
    }
    if (!obj.token_symbol && obj.metric_code === 'm22') {
      ratioName = 'Minimum Collateral Ratio'
    }
    if (!obj.token_symbol && obj.metric_code === 'm21') {
      ratioName = 'Collateral Ratio'
    }

    const cardFound = acc.find((card: any) => {
      return (
        card.blockchain === blockchain && card.protocol === protocol && card.position === position
      )
    })

    if (cardFound) {
      const categoryFound = cardFound?.categories.find((category: any) => {
        return category.name === positionType
      })

      if (categoryFound) {
        categoryFound?.ratios?.push({
          name: ratioName,
          value: obj.metric_value ? obj.metric_value : 0
        })
      } else {
        cardFound?.categories?.push({
          name: positionType,
          ratios: [
            {
              name: ratioName,
              value: obj.metric_value ? obj.metric_value : 0
            }
          ]
        })
      }
    } else {
      acc.push({
        blockchain,
        protocol,
        position,
        cardType: 'metrics',
        categories: [
          {
            name: positionType,
            ratios: [
              {
                name: ratioName,
                value: obj.metric_value ? obj.metric_value : 0
              }
            ]
          }
        ]
      })
    }

    return acc
  }, [])

  const vaultCards = rowsFiltered
    .reduce((acc: any, obj: any): any => {
      const position = obj.lptoken_name.trim()
      const origin = obj.origin.trim()

      if (!position.includes('Vault') || origin !== 'detail') {
        return acc
      }

      const value = obj.bal_1 ? obj.bal_1 : 0
      const blockchain = obj?.blockchain?.trim()
      const protocol = obj?.protocol?.trim()

      const category = value > 0 ? 'Farming Funds: Collateral' : 'Farming Funds: Debt'

      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === blockchain && card.protocol === protocol && card.position === position
        )
      })

      if (cardFound) {
        const categoryFound = cardFound?.categories.find((category: any) => {
          return category.name === category
        })

        if (categoryFound) {
          categoryFound?.tokens?.push({
            symbol: obj.token_symbol,
            balance: value,
            usdValue: value * (obj.next_period_first_price ? obj.next_period_first_price : 0)
          })
        } else {
          cardFound?.categories?.push({
            name: category,
            tokens: [
              {
                symbol: obj.token_symbol,
                balance: value,
                usdValue: value * (obj.next_period_first_price ? obj.next_period_first_price : 0)
              }
            ]
          })
        }
      } else {
        acc.push({
          blockchain,
          protocol,
          position,
          cardType: 'metrics',
          categories: [
            {
              name: category,
              tokens: [
                {
                  symbol: obj.token_symbol,
                  balance: value,
                  usdValue: value * (obj.next_period_first_price ? obj.next_period_first_price : 0)
                }
              ]
            }
          ]
        })
      }

      return acc
    }, [])
    .map((card: any) => {
      card.categories.forEach((category: any) => {
        card.totalUsdValue =
          (card.totalUsdValue || 0) +
          category.tokens.reduce((acc: any, obj: any) => {
            return acc + obj.usdValue
          }, 0)
      })
      return card
    })

  const mergeAllCards = (cards1: any, cards2: any, cards3: any) => {
    const cards = cards1.concat(cards2).concat(cards3)
    const cardsMerged = cards.reduce((acc: any, obj: any): any => {
      const cardFound = acc.find((card: any) => {
        return (
          card.blockchain === obj.blockchain &&
          card.protocol === obj.protocol &&
          card.position === obj.position
        )
      })

      if (cardFound) {
        cardFound.categories = cardFound.categories.concat(obj.categories)
      } else {
        acc.push(obj)
      }

      return acc
    }, [])

    return cardsMerged
  }

  const allCards = mergeAllCards(commonCards, vaultCards, metricsCards)
  const allCardsSortedByTotalUsdValue = allCards.sort((a: any, b: any) => {
    return b.totalUsdValue - a.totalUsdValue
  })

  return allCardsSortedByTotalUsdValue
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
