export const formatMbSize = (mBytes: number) => {
  if (mBytes < 1024) {
    return `${mBytes} Мб`
  } else if (mBytes < 1024 * 1024) {
    return `${(mBytes / 1024).toFixed(2)} Гб`
  } else {
    return `${(mBytes / (1024 * 1024)).toFixed(2)} Тб`
  }
}
