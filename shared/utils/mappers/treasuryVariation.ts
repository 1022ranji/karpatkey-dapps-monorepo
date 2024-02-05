import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

export const getTreasuryVariationForThePeriod = (
  waterfall1ReportFiltered: any,
  waterfall1ReportETHFiltered: any,
  financialMetricsFiltered: any,
  params: any
) => {
  const valuesForThePeriodUSD: any[] = []
  const valuesForThePeriodETH: any[] = []

  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })
  const rowsUSD = isDDay
    ? waterfall1ReportFiltered
        .map((row: any) => {
          const value = row?.waterfall_metric?.replace(/[0-9][0-9] /g, '')?.trim()
          const funds = +row?.metric_value ?? 0

          const key = value?.includes('Initial Balance')
            ? 1
            : value?.includes('Operations')
            ? 2
            : value?.includes('DeFi')
            ? 3
            : 4

          return {
            value,
            funds,
            key
          }
        })
        .filter((elm: any) => elm)
        .sort((a: any, b: any) => a.key - b.key)
        .map((row: any, index: number) => {
          valuesForThePeriodUSD[index] = {
            uv: row.funds,
            pv:
              index === 0
                ? 0
                : valuesForThePeriodUSD[index - 1].pv + valuesForThePeriodUSD[index - 1].uv
          }
          return {
            ...row,
            uv: row.funds,
            pv:
              index === 0 || index === 3
                ? 0
                : valuesForThePeriodUSD[index - 1].pv + valuesForThePeriodUSD[index - 1].uv
          }
        })
    : financialMetricsFiltered
        .filter((row: any) => {
          return (
            row.metric_code === 'm07' ||
            row.metric_code === 'm08' ||
            row.metric_code === 'm09' ||
            row.metric_code === 'm10'
          )
        })
        .reduce((acc: any, obj: any): { funds: number; value: string; key: number }[] => {
          const metricCode = obj['metric_code'].trim()
          const metric = obj['metric'].trim()
          const metricKey =
            metricCode === 'm07'
              ? { value: 'Initial Balance', key: 1 }
              : metricCode === 'm10'
              ? { value: 'NonFarming Results', key: 2 }
              : metricCode === 'm09'
              ? { value: 'Farming Results', key: 3 }
              : metricCode === 'm08'
              ? { value: 'Final Balance', key: 4 }
              : { value: metric, key: 5 }

          if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

          const value = obj['metric_value'] ? obj['metric_value'] : 0
          acc[metricKey.key - 1].funds = acc[metricKey.key - 1].funds + value
          acc[metricKey.key - 1] = {
            ...acc[metricKey.key - 1],
            ...metricKey
          }

          return acc
        }, [])
        .filter((elm: any) => elm)
        .sort((a: any, b: any) => a.key - b.key)
        .map((row: any, index: number) => {
          valuesForThePeriodUSD[index] = {
            uv: row.funds,
            pv:
              index === 0
                ? 0
                : valuesForThePeriodUSD[index - 1].pv + valuesForThePeriodUSD[index - 1].uv
          }
          return {
            ...row,
            uv: row.funds,
            pv:
              index === 0 || index === 3
                ? 0
                : valuesForThePeriodUSD[index - 1].pv + valuesForThePeriodUSD[index - 1].uv
          }
        })

  const haveValueFinalBalanceUSD = rowsUSD.find((row: any) => row.key === 4)
  if (!haveValueFinalBalanceUSD && rowsUSD.length > 0) {
    const total = rowsUSD.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsUSD.push({
      funds: total,
      value: 'Final Balance',
      key: rowsUSD.length + 1,
      uv: total,
      pv: 0
    })
  }

  const rowsETH = isDDay
    ? waterfall1ReportETHFiltered
        .map((row: any) => {
          const value = row?.waterfall_metric?.replace(/[0-9][0-9] /g, '')?.trim()
          const funds = +row?.metric_value ?? 0

          const key = value?.includes('Initial Balance')
            ? 1
            : value?.includes('Operations')
            ? 2
            : value?.includes('DeFi')
            ? 3
            : 4

          return {
            value,
            funds,
            key
          }
        })
        .filter((elm: any) => elm)
        .sort((a: any, b: any) => a.key - b.key)
        .map((row: any, index: number) => {
          valuesForThePeriodETH[index] = {
            uv: row.funds,
            pv:
              index === 0
                ? 0
                : valuesForThePeriodETH[index - 1].pv + valuesForThePeriodETH[index - 1].uv
          }
          return {
            ...row,
            uv: row.funds,
            pv:
              index === 0 || index === 3
                ? 0
                : valuesForThePeriodETH[index - 1].pv + valuesForThePeriodETH[index - 1].uv
          }
        })
    : financialMetricsFiltered
        .filter((row: any) => {
          return (
            row.metric_code === 'm07' ||
            row.metric_code === 'm08' ||
            row.metric_code === 'm09' ||
            row.metric_code === 'm10'
          )
        })
        .reduce((acc: any, obj: any): { funds: number; value: string; key: number }[] => {
          const metricCode = obj['metric_code'].trim()
          const metric = obj['metric'].trim()
          const metricKey =
            metricCode === 'm07'
              ? { value: 'Initial Balance', key: 1 }
              : metricCode === 'm10'
              ? { value: 'NonFarming Results', key: 2 }
              : metricCode === 'm09'
              ? { value: 'Farming Results', key: 3 }
              : metricCode === 'm08'
              ? { value: 'Final Balance', key: 4 }
              : { value: metric, key: 5 }

          if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

          const value = obj['metric_value'] ? obj['metric_value'] : 0
          acc[metricKey.key - 1].funds = acc[metricKey.key - 1].funds + value
          acc[metricKey.key - 1] = {
            ...acc[metricKey.key - 1],
            ...metricKey
          }

          return acc
        }, [])
        .filter((elm: any) => elm)
        .sort((a: any, b: any) => a.key - b.key)
        .map((row: any, index: number) => {
          valuesForThePeriodETH[index] = {
            uv: row.funds,
            pv:
              index === 0
                ? 0
                : valuesForThePeriodETH[index - 1].pv + valuesForThePeriodETH[index - 1].uv
          }
          return {
            ...row,
            uv: row.funds,
            pv:
              index === 0 || index === 3
                ? 0
                : valuesForThePeriodETH[index - 1].pv + valuesForThePeriodETH[index - 1].uv
          }
        })

  const haveValueFinalBalanceETH = rowsETH.find((row: any) => row.key === 4)
  if (!haveValueFinalBalanceETH && rowsETH.length > 0) {
    const total = rowsETH.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsETH.push({
      funds: total,
      value: 'Final Balance',
      key: rowsETH.length + 1,
      uv: total,
      pv: 0
    })
  }

  return {
    rowsUSD,
    rowsETH
  }
}

export const getTreasuryVariationHistory = (data: any, dataETH: any, params: any) => {
  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  const valuesForThisYearUSD: any[] = []
  const rowsUSD = data
    .map((row: any) => {
      const value = row?.metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0

      let valueCustom = ''
      let key = 0
      if (isDDay) {
        valueCustom = value
        key = value?.includes('Initial Balance')
          ? 1
          : value?.includes('Operations')
          ? 2
          : value?.includes('DeFi')
          ? 3
          : 4
      } else {
        valueCustom = value.includes('Initial Balance')
          ? 'Initial Balance'
          : value?.includes('Operations')
          ? 'NonFarming Results'
          : value?.includes('DeFi')
          ? 'Farming Results'
          : value?.includes('Final Balance')
          ? 'Final Balance'
          : value
        key = value?.includes('Initial Balance')
          ? 1
          : value?.includes('Operations')
          ? 2
          : value?.includes('DeFi')
          ? 3
          : 4
      }

      return {
        value: valueCustom,
        funds,
        key
      }
    })
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThisYearUSD[index] = {
        uv: row.funds,
        pv:
          index === 0 ? 0 : valuesForThisYearUSD[index - 1].pv + valuesForThisYearUSD[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThisYearUSD[index - 1].pv + valuesForThisYearUSD[index - 1].uv
      }
    })

  if (rowsUSD.length > 0) {
    const total = rowsUSD.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsUSD.push({
      funds: total,
      value: 'Final Balance',
      key: rowsUSD.length + 1,
      uv: total,
      pv: 0
    })
  }

  const valuesForThisYearETH: any[] = []
  const rowsETH = dataETH
    .map((row: any) => {
      const value = row?.metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0

      let valueCustom = ''
      let key = 0
      if (isDDay) {
        valueCustom = value
        key = value?.includes('Initial Balance')
          ? 1
          : value?.includes('Operations')
          ? 2
          : value?.includes('DeFi')
          ? 3
          : 4
      } else {
        valueCustom = value.includes('Initial Balance')
          ? 'Initial Balance'
          : value?.includes('Operations')
          ? 'NonFarming Results'
          : value?.includes('DeFi')
          ? 'Farming Results'
          : value?.includes('Final Balance')
          ? 'Final Balance'
          : value
        key = value?.includes('Initial Balance')
          ? 1
          : value?.includes('Operations')
          ? 2
          : value?.includes('DeFi')
          ? 3
          : 4
      }

      return {
        value: valueCustom,
        funds,
        key
      }
    })
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThisYearETH[index] = {
        uv: row.funds,
        pv:
          index === 0 ? 0 : valuesForThisYearETH[index - 1].pv + valuesForThisYearETH[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThisYearETH[index - 1].pv + valuesForThisYearETH[index - 1].uv
      }
    })

  if (rowsETH.length > 0) {
    const total = rowsETH.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsETH.push({
      funds: total,
      value: 'Final Balance',
      key: rowsETH.length + 1,
      uv: total,
      pv: 0
    })
  }

  return {
    rowsUSD,
    rowsETH
  }
}

export const getTreasuryVariationForThePeriodDetails = (data: any, dataETH: any, params: any) => {
  const valuesForThePeriodDetailUSD: any[] = []
  const valuesForThePeriodDetailETH: any[] = []

  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rowsUSD = data.filter((row: any) => {
    return (
      row.metric === 'non farming price variation' ||
      row.metric === 'usd initial balance & UR' ||
      row.metric === 'nonfarming_swap' ||
      row.metric === 'nonfarming_outcome' ||
      row.metric === 'nonfarming_income' ||
      row.metric === 'farming rewards' ||
      row.metric === 'farming token variation' ||
      row.metric === 'farming price variation' ||
      row.metric === 'farming executed only swaps' ||
      row.metric === 'nonfarming_bridge'
    )
  })

  if (isDDay) {
    rowsUSD = rowsUSD.reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric.trim()
        const metricCode = obj?.metric_code.trim()
        const nonfarmingPosition = obj?.nonfarming_position.trim()

        const metricKey =
          metricCode === 'm07'
            ? { value: 'Initial Balance', shortedValue: 'IB', key: 1 }
            : metricCode === 'm11'
            ? {
                value: 'Ops-Price variation for initial balance',
                shortedValue: 'NFP',
                key: 2
              }
            : metric === 'nonfarming_income'
            ? { value: 'Ops-Income', shortedValue: 'NFI', key: 3 }
            : metric === 'nonfarming_outcome'
            ? { value: 'Ops-Outcome', shortedValue: 'NFO', key: 4 }
            : metric === 'nonfarming_swap'
            ? { value: 'Ops-Swaps', shortedValue: 'NFS', key: 5 }
            : metric === 'nonfarming_bridge'
            ? { value: 'Ops-Bridges', shortedValue: 'NFB', key: 6 }
            : metricCode === 'm14' && nonfarmingPosition === 'TRUE'
            ? { value: 'Ops-Rewards', shortedValue: 'OR', key: 7 }
            : metricCode === 'm15' && nonfarmingPosition === 'TRUE'
            ? {
                value: 'Ops-Fees / Rebasing / Pool token variation',
                shortedValue: 'OFRP',
                key: 8
              }
            : metric === 'farming executed only swaps'
            ? { value: 'DeFi-Swaps', shortedValue: 'FS', key: 9 }
            : metric === 'farming rewards'
            ? { value: 'DeFi-Rewards', shortedValue: 'FR', key: 10 }
            : metric === 'farming token variation'
            ? {
                value: 'DeFi-Fees / Rebasing / Pool token variation',
                shortedValue: 'FFRP',
                key: 11
              }
            : metric === 'farming price variation'
            ? {
                value: 'DeFi-Price Variation in Rew,Fees,TkVar',
                shortedValue: 'FPVRFT',
                key: 12
              }
            : { value: metric, key: 13 }

        if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

        acc[metricKey.key - 1] = {
          ...acc[metricKey.key - 1],
          funds: acc[metricKey.key - 1].funds + (obj['metric_value'] ?? 0)
        }

        return acc
      },
      []
    )
  } else {
    rowsUSD = rowsUSD.reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric.trim()
        const metricKey =
          metric === 'usd initial balance & UR'
            ? { value: 'Initial Balance', shortedValue: 'IB', key: 1 }
            : metric === 'non farming price variation'
            ? {
                value: 'NonFarm-Price variation for initial balance',
                shortedValue: 'NFP',
                key: 2
              }
            : metric === 'nonfarming_income'
            ? { value: 'NonFarm-Income', shortedValue: 'NFI', key: 3 }
            : metric === 'nonfarming_outcome'
            ? { value: 'NonFarm-Outcome', shortedValue: 'NFO', key: 4 }
            : metric === 'nonfarming_swap'
            ? { value: 'NonFarm-Swaps', shortedValue: 'NFS', key: 5 }
            : metric === 'nonfarming_bridge'
            ? { value: 'NonFarm-Bridges', shortedValue: 'NFB', key: 6 }
            : metric === 'farming executed only swaps'
            ? { value: 'Farm-Swaps', shortedValue: 'FS', key: 7 }
            : metric === 'farming rewards'
            ? { value: 'Farm-Rewards', shortedValue: 'FR', key: 8 }
            : metric === 'farming token variation'
            ? {
                value: 'Farm-Fees / Rebasing / Pool token variation',
                shortedValue: 'FFRP',
                key: 9
              }
            : metric === 'farming price variation'
            ? {
                value: 'Farm-Price Variation in Rew,Fees,TkVar',
                shortedValue: 'FPVRFT',
                key: 10
              }
            : { value: metric, key: 11 }

        if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

        acc[metricKey.key - 1] = {
          ...acc[metricKey.key - 1],
          funds: acc[metricKey.key - 1].funds + (obj['metric_value'] ?? 0)
        }

        return acc
      },
      []
    )
  }

  rowsUSD = rowsUSD
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      const pvValue =
        index === 0
          ? 0
          : valuesForThePeriodDetailUSD[index - 1].pv + valuesForThePeriodDetailUSD[index - 1].uv
      valuesForThePeriodDetailUSD[index] = {
        uv: row.funds,
        pv: pvValue
      }
      return {
        ...row,
        uv: row.funds,
        pv: pvValue
      }
    })

  if (rowsUSD.length > 0) {
    const total = rowsUSD.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsUSD.push({
      funds: total,
      value: 'Final Balance',
      shortedValue: 'FB',
      key: rowsUSD.length + 1,
      uv: total,
      pv: 0
    })
  }

  // Remove funds in the range of 0.5
  rowsUSD = rowsUSD.filter(
    (row: any) => !(row.funds === 0 || (row.funds < 0.5 && row.funds > -0.5))
  )

  //////////////// ETH

  let rowsETH = dataETH.filter((row: any) => {
    return (
      row.metric.includes('non farming price variation') ||
      row.metric.includes('initial balance & UR') ||
      row.metric.includes('nonfarming_swap') ||
      row.metric.includes('nonfarming_outcome') ||
      row.metric.includes('nonfarming_income') ||
      row.metric.includes('farming rewards') ||
      row.metric.includes('farming token variation') ||
      row.metric.includes('farming price variation') ||
      row.metric.includes('farming executed only swaps') ||
      row.metric.includes('nonfarming_bridge')
    )
  })

  if (isDDay) {
    rowsETH = rowsETH.reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric.trim()
        const metricCode = obj?.metric_code.trim()
        const nonfarmingPosition = obj?.nonfarming_position.trim()

        const metricKey =
          metricCode === 'm07_eth'
            ? { value: 'Initial Balance', shortedValue: 'IB', key: 1 }
            : metricCode === 'm11_eth'
            ? {
                value: 'Ops-Price variation for initial balance',
                shortedValue: 'NFP',
                key: 2
              }
            : metric === 'nonfarming_income eth'
            ? { value: 'Ops-Income', shortedValue: 'NFI', key: 3 }
            : metric === 'nonfarming_outcome eth'
            ? { value: 'Ops-Outcome', shortedValue: 'NFO', key: 4 }
            : metric === 'nonfarming_swap eth'
            ? { value: 'Ops-Swaps', shortedValue: 'NFS', key: 5 }
            : metric === 'nonfarming_bridge eth'
            ? { value: 'Ops-Bridges', shortedValue: 'NFB', key: 6 }
            : metricCode === 'm14_eth' && nonfarmingPosition === 'TRUE'
            ? { value: 'Ops-Rewards', shortedValue: 'OR', key: 7 }
            : metricCode === 'm15_eth' && nonfarmingPosition === 'TRUE'
            ? {
                value: 'Ops-Fees / Rebasing / Pool token variation',
                shortedValue: 'OFRP',
                key: 8
              }
            : metric === 'farming executed only swaps eth'
            ? { value: 'DeFi-Swaps', shortedValue: 'FS', key: 9 }
            : metric === 'farming rewards'
            ? { value: 'DeFi-Rewards', shortedValue: 'FR', key: 10 }
            : metric === 'farming token variation eth'
            ? {
                value: 'DeFi-Fees / Rebasing / Pool token variation',
                shortedValue: 'FFRP',
                key: 11
              }
            : metric === 'farming price variation'
            ? {
                value: 'DeFi-Price Variation in Rew,Fees,TkVar',
                shortedValue: 'FPVRFT',
                key: 12
              }
            : { value: metric, key: 13 }

        if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

        acc[metricKey.key - 1] = {
          ...acc[metricKey.key - 1],
          funds: acc[metricKey.key - 1].funds + (obj['metric_value'] ?? 0)
        }

        return acc
      },
      []
    )
  } else {
    rowsETH = rowsETH.reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric.trim()
        const metricKey =
          metric === 'eth initial balance & UR'
            ? { value: 'Initial Balance', shortedValue: 'IB', key: 1 }
            : metric === 'non farming price variation eth'
            ? {
                value: 'NonFarm-Price variation for initial balance',
                shortedValue: 'NFP',
                key: 2
              }
            : metric === 'nonfarming_income eth'
            ? { value: 'NonFarm-Income', shortedValue: 'NFI', key: 3 }
            : metric === 'nonfarming_outcome eth'
            ? { value: 'NonFarm-Outcome', shortedValue: 'NFO', key: 4 }
            : metric === 'nonfarming_swap eth'
            ? { value: 'NonFarm-Swaps', shortedValue: 'NFS', key: 5 }
            : metric === 'nonfarming_bridge eth'
            ? { value: 'NonFarm-Bridges', shortedValue: 'NFB', key: 6 }
            : metric === 'farming executed only swaps eth'
            ? { value: 'Farm-Swaps', shortedValue: 'FS', key: 7 }
            : metric === 'farming rewards'
            ? { value: 'Farm-Rewards', shortedValue: 'FR', key: 8 }
            : metric === 'farming token variation eth'
            ? {
                value: 'Farm-Fees / Rebasing / Pool token variation',
                shortedValue: 'FFRP',
                key: 9
              }
            : metric === 'farming price variation'
            ? {
                value: 'Farm-Price Variation in Rew,Fees,TkVar',
                shortedValue: 'FPVRFT',
                key: 10
              }
            : { value: metric, key: 11 }

        if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

        acc[metricKey.key - 1] = {
          ...acc[metricKey.key - 1],
          funds: acc[metricKey.key - 1].funds + (obj['metric_value'] ?? 0)
        }

        return acc
      },
      []
    )
  }

  rowsETH = rowsETH
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      const pvValue =
        index === 0
          ? 0
          : valuesForThePeriodDetailETH[index - 1].pv + valuesForThePeriodDetailETH[index - 1].uv
      valuesForThePeriodDetailETH[index] = {
        uv: row.funds,
        pv: pvValue
      }
      return {
        ...row,
        uv: row.funds,
        pv: pvValue
      }
    })

  if (rowsETH.length > 0) {
    const total = rowsETH.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rowsETH.push({
      funds: total,
      value: 'Final Balance',
      shortedValue: 'FB',
      key: rowsETH.length + 1,
      uv: total,
      pv: 0
    })
  }

  // Remove funds in the range of 0.5
  rowsETH = rowsETH.filter(
    (row: any) => !(row.funds === 0 || (row.funds < 0.5 && row.funds > -0.5))
  )

  return {
    rowsUSD,
    rowsETH
  }
}

export const treasuryVariationData = ({
  waterfall1Report,
  waterfall1ReportETH,
  historicVariation,
  historicVariationETH,
  financialMetricsWaterfall,
  financialMetricsWaterfallETH,
  financialMetrics,
  params
}: any) => {
  // For the period
  const treasuryVariationData = getTreasuryVariationForThePeriod(
    waterfall1Report,
    waterfall1ReportETH,
    financialMetrics,
    params
  )

  // In this year
  const historicVariationData = getTreasuryVariationHistory(
    historicVariation,
    historicVariationETH,
    params
  )

  // For the period, detail
  const treasuryVariationForThePeriodDetailData = getTreasuryVariationForThePeriodDetails(
    financialMetricsWaterfall,
    financialMetricsWaterfallETH,
    params
  )

  return {
    USD: {
      treasuryVariationData: treasuryVariationData.rowsUSD,
      historicVariationData: historicVariationData.rowsUSD,
      treasuryVariationForThePeriodDetailData: treasuryVariationForThePeriodDetailData.rowsUSD
    },
    ETH: {
      treasuryVariationData: treasuryVariationData.rowsETH,
      historicVariationData: historicVariationData.rowsETH,
      treasuryVariationForThePeriodDetailData: treasuryVariationForThePeriodDetailData.rowsETH
    }
  }
}
