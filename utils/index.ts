export const getLastWeekDate = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).getTime()
}

export const getTodayDate = () => {
  const end = new Date()
  end.setHours(23, 59, 59, 999)
  return end.getTime()
}
