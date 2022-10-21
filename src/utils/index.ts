const formatDateString = (date: string): string => date.split('/').reverse().join('-')

// improve: break to separate variables (minMs, hourMs etc.) to avoid magic numbers
export const oneDayInMs = 1000 * 3600 * 24

export const dateStringToMs = (dateString: string): number => {
  return new Date(dateString).getTime()
}

export const dateMsToString = (ms: number): string => {
  return formatDateString(new Date(ms).toLocaleDateString())
}

export const getCurrDate = (): { ms: number, str: string } => {
  const d = new Date()
  return {
    ms: d.getTime(),
    str: formatDateString(d.toLocaleDateString())
  }
}

