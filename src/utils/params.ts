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

/**
 * Hide the term farming funds since 11 2023
 * @param param
 */
export const isFeatureFlagOne = (param?: { yearArg: string; monthArg: string }) => {
  const { year, month } = getYearAndMonth(param)
  if (!year || !month) return false

  const monthReference = 11
  const yearReference = 2023

  return year > yearReference || (year === yearReference && month >= monthReference)
}

/**
 * Hide the APY column since 11 2023
 * @param param
 */
export const isFeatureFlagTwo = (param?: { yearArg: string; monthArg: string }) => {
  const { year, month } = getYearAndMonth(param)
  if (!year || !month) return false

  const monthReference = 5
  const yearReference = 2024

  return year > yearReference || (year === yearReference && month >= monthReference)
}
