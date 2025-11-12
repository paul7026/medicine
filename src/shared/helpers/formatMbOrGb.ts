export const formatMbOrGb = (value: number) => {
  if (value >= 1024 * 1024) {
    return value % (1024 * 1024) === 0
      ? value / (1024 * 1024) + ' Тб'
      : (value / (1024 * 1024)).toFixed(2) + ' Тб'
  }
  if (value >= 1024) {
    return value % 1024 === 0
      ? value / 1024 + ' Гб'
      : (value / 1024).toFixed(2) + ' Гб'
  }
  return value + ' Байт'
}
