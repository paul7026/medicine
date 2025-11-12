export const getFirstPartOfUrl = (pathname: string) => {
  const firstSlashIndex = pathname.indexOf('/')

  const nextSlashIndex = pathname.indexOf('/', 1)

  if (nextSlashIndex === -1) {
    return pathname.substring(firstSlashIndex + 1)
  }

  return pathname.substring(firstSlashIndex + 1, nextSlashIndex)
}
