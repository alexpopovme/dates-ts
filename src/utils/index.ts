const formatDateString = (date: string): string => date.split('/').reverse().join('-')

// improve: break to separate variables (minMs, hourMs etc.) to avoid magic numbers
export const oneDayInMs = 1000 * 3600 * 24

export const dateStringToMs = (dateString: string): number => {
  return new Date(dateString).getTime()
}

export const dateMsToString = (ms?: number): string => {
  const d = ms ? new Date(ms) : new Date()
  return formatDateString(d.toLocaleDateString())
}
