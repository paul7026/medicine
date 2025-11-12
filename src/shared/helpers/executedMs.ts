export const executedMs = (executedTime?: string) => {
  if (!executedTime || executedTime === '0') return '--'

  const msTotal = Math.round(parseFloat(executedTime) * 1000)
  const seconds = Math.floor(msTotal / 1000)
  const milliseconds = msTotal % 1000

  if (seconds > 0) {
    return `${seconds} сек ${milliseconds} мс`
  }
  return `${milliseconds} мс`
}
