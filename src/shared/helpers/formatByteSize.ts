export const formatByteSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} Б`
  } else if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} Кб`
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))} Мб`
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Гб`
  }
}
