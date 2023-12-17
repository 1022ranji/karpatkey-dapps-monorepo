export const getYearAndMonth = (param?: { yearArg: string; monthArg: string }) => {
  let yearParam = param?.yearArg ?? null
  let monthParam = param?.monthArg ?? null
  if (!yearParam && !monthParam && typeof window !== 'undefined' && window?.location?.search) {
    const queryParams = new URLSearchParams(window.location.search)
    yearParam = queryParams.get('year')
    monthParam = queryParams.get('month')
  }

  const year = yearParam ? parseInt(yearParam) : null
  const month = monthParam ? parseInt(monthParam) : null
  return { year, month }
}

export const isYearAndMonthValid = (param?: { yearArg: string; monthArg: string }) => {
  const { year, month } = getYearAndMonth(param)
  return year && month && year >= 2023 && month >= 11
}
