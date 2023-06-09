import numbro from 'numbro'

export const formatCurrency = (value: number, mantissa = 0) => {
  return numbro(value).formatCurrency({
    spaceSeparated: false,
    mantissa,
    thousandSeparated: true
  })
}

export const formatPercentage = (value: number) => {
  return numbro(value).format({
    output: 'percent',
    spaceSeparated: false,
    mantissa: 2
  })
}

export const formatNumber = (value: number, mantissa = 2) => {
  return numbro(value).format({
    spaceSeparated: false,
    thousandSeparated: true,
    mantissa
  })
}
