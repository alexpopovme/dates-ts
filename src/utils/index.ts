const secondMs = 1000
const minuteSeconds = 60
const hourMinutes = 60
const dayHours = 24

export const oneDayInMs = secondMs * minuteSeconds * hourMinutes * dayHours

export const formatDateString = (date: string): string => date.split('/').reverse().join('-')

export const dateToLocaleStr = (date: Date) => date.toLocaleDateString('en-GB')

export const dateStringToMs = (dateString: string): number => {
  return new Date(dateString).getTime()
}

export const dateMsToString = (ms: number): string => {
  return formatDateString(dateToLocaleStr(new Date(ms)))
}

export const getCurrDate = (): { ms: number, str: string } => {
  const d = new Date()
  return {
    ms: d.getTime(),
    str: formatDateString(dateToLocaleStr(d))
  }
}

