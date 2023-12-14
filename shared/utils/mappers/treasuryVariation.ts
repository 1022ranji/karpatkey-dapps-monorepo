export const getTreasuryVariationForThePeriod = (data: any) => {
  const valuesForThePeriod: any[] = []
  const rows = data
    .map((row: any) => {
      const value = row?.waterfall_metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0
      const key = value.includes('Initial Balance')
        ? 1
        : value.includes('Operations results')
          ? 2
          : value.includes('DeFi results')
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

export const getTreasuryVariationHistory = (data: any) => {
  const valuesForThisYear: any[] = []

  const rows = data
    .map((row: any) => {
      const value = row?.metric?.replace(/[0-9][0-9] /g, '')?.trim()
      const funds = +row?.metric_value ?? 0
      const key = value.includes('Initial Balance')
        ? 1
        : value.includes('Operations results')
          ? 2
          : value.includes('DeFi results')
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

export const getTreasuryVariationForThePeriodDetails = (data: any) => {
  const valuesForThePeriodDetail: any[] = []

  const rows = data
    .filter((row: any) => {
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
    .reduce(
      (
        acc: any,
        obj: any
      ): { funds: number; value: string; shortedValue: string; key: number }[] => {
        const metric = obj?.metric?.trim()
        const metricCode = obj?.metric_code
        const nonfarmingPosition = obj?.nonfarming_position

        console.log(
          'metric',
          obj?.metric,
          obj?.metric_code,
          obj?.Waterfall_Metrics?.replace(/[0-9][0-9] /g, '')?.trim()
        )
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
