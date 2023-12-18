import { isYearAndMonthValid } from '@karpatkey-monorepo/reports/src/utils/params'

export const getTreasuryVariationForThePeriod = (data: any, params: any) => {
  const valuesForThePeriod: any[] = []

  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rows = []

  if (isDDay) {
    rows = data.map((row: any) => {
      const value = row?.waterfall_metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0

      const valueLabel =
        value === 'Operations results' ? 'Operations' : value === 'DeFi results' ? 'DeFi' : value

      const key = valueLabel.includes('Initial Balance')
        ? 1
        : valueLabel.includes('Operations')
          ? 2
          : valueLabel.includes('DeFi')
            ? 3
            : 4
      return {
        value: valueLabel,
        funds,
        key
      }
    })
  } else {
    rows = data
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
  }

  rows = rows
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThePeriod[index] = {
        uv: row.funds,
        pv: index === 0 ? 0 : valuesForThePeriod[index - 1].pv + valuesForThePeriod[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThePeriod[index - 1].pv + valuesForThePeriod[index - 1].uv
      }
    })

  const haveValueFinalBalance = rows.find((row: any) => row.key === 4)
  if (!haveValueFinalBalance && rows.length > 0) {
    const total = rows.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rows.push({
      funds: total,
      value: 'Final Balance',
      key: rows.length + 1,
      uv: total,
      pv: 0
    })
  }

  return rows
}

export const getTreasuryVariationHistory = (data: any, params: any) => {
  const valuesForThisYear: any[] = []

  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rows = []

  if (isDDay) {
    rows = data.map((row: any) => {
      const value = row?.metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0
      const valueLabel =
        value === 'Operations results' ? 'Operations' : value === 'DeFi results' ? 'DeFi' : value

      const key = valueLabel.includes('Initial Balance')
        ? 1
        : valueLabel.includes('Operations')
          ? 2
          : valueLabel.includes('DeFi')
            ? 3
            : 4
      return {
        value: valueLabel,
        funds,
        key
      }
    })
  } else {
    rows = data
      .filter((row: any) => {
        return (
          row.metric.includes('Initial Balance') ||
          row.metric.includes('NonFarming Results') ||
          row.metric.includes('Farming Results')
        )
      })
      .reduce((acc: any, obj: any): { funds: number; value: string; key: number }[] => {
        const metric = obj['metric'].trim()
        const metricKey = metric.includes('Initial Balance')
          ? { value: 'Initial Balance', key: 1 }
          : metric.includes('NonFarming Results')
            ? { value: 'NonFarming Results', key: 2 }
            : metric.includes('Farming Results')
              ? { value: 'Farming Results', key: 3 }
              : { value: metric, key: 4 }

        if (!acc[metricKey.key - 1]) acc[metricKey.key - 1] = { funds: 0, ...metricKey }

        acc[metricKey.key - 1].funds = acc[metricKey.key - 1].funds + (obj['metric_value'] ?? 0)
        acc[metricKey.key - 1] = {
          ...acc[metricKey.key - 1],
          ...metricKey
        }

        return acc
      }, [])
  }

  rows = rows
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      valuesForThisYear[index] = {
        uv: row.funds,
        pv: index === 0 ? 0 : valuesForThisYear[index - 1].pv + valuesForThisYear[index - 1].uv
      }
      return {
        ...row,
        uv: row.funds,
        pv:
          index === 0 || index === 3
            ? 0
            : valuesForThisYear[index - 1].pv + valuesForThisYear[index - 1].uv
      }
    })

  if (rows.length > 0) {
    const total = rows.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rows.push({
      funds: total,
      value: 'Final Balance',
      key: rows.length + 1,
      uv: total,
      pv: 0
    })
  }
  return rows
}

export const getTreasuryVariationForThePeriodDetails = (data: any, params: any) => {
  const valuesForThePeriodDetail: any[] = []

  const isDDay = isYearAndMonthValid({ yearArg: params?.year, monthArg: params?.month })

  let rows = data.filter((row: any) => {
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
    rows = rows.reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric?.trim()
        const metricCode = obj?.metric_code
        const nonfarmingPosition = obj?.nonfarming_position

        const label = obj?.Waterfall_Metrics?.replace(/[0-9][0-9] /g, '')?.trim()
        const metricKey =
          metricCode === 'm07'
            ? { value: label, shortedValue: 'IB', key: 1 }
            : metricCode === 'm11'
              ? { value: label, shortedValue: 'OPVB', key: 2 }
              : metric === 'nonfarming_income'
                ? { value: label, shortedValue: 'OI', key: 3 }
                : metric === 'nonfarming_outcome'
                  ? { value: label, shortedValue: 'OU', key: 4 }
                  : metric === 'nonfarming_swap'
                    ? { value: label, shortedValue: 'NFS', key: 5 }
                    : metric === 'nonfarming_bridge'
                      ? { value: label, shortedValue: 'NFB', key: 6 }
                      : metricCode === 'm14' && nonfarmingPosition === 'TRUE'
                        ? { value: label, shortedValue: 'NFS', key: 7 }
                        : metricCode === 'm15' && nonfarmingPosition === 'TRUE'
                          ? { value: label, shortedValue: 'NFFRP', key: 8 }
                          : metricCode === 'm20'
                            ? { value: label, shortedValue: 'DS', key: 9 }
                            : metricCode === 'm14'
                              ? { value: label, shortedValue: 'DR', key: 10 }
                              : metricCode === 'm15'
                                ? { value: label, shortedValue: 'DF', key: 11 }
                                : { value: metric, key: 12 }

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
    rows = rows.reduce(
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

  rows = rows
    .filter((elm: any) => elm)
    .sort((a: any, b: any) => a.key - b.key)
    .map((row: any, index: number) => {
      const pvValue =
        index === 0
          ? 0
          : valuesForThePeriodDetail[index - 1].pv + valuesForThePeriodDetail[index - 1].uv
      valuesForThePeriodDetail[index] = {
        uv: row.funds,
        pv: pvValue
      }
      return {
        ...row,
        uv: row.funds,
        pv: pvValue
      }
    })

  if (rows.length > 0) {
    const total = rows.reduce(
      (accumulator: number, currentValue: { funds: number }) => accumulator + currentValue.funds,
      0
    )

    rows.push({
      funds: total,
      value: 'Final Balance',
      shortedValue: 'FB',
      key: rows.length + 1,
      uv: total,
      pv: 0
    })
  }

  // Remove funds in the range of 0.5
  return rows.filter((row: any) => !(row.funds === 0 || (row.funds < 0.5 && row.funds > -0.5)))
}
