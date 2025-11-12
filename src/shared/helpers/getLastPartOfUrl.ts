export const getLastPartOfUrl = (pathname: string) => {
  const lastSlashIndex = pathname.lastIndexOf('/')

  return pathname.substring(lastSlashIndex + 1)
}
