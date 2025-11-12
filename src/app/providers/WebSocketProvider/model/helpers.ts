export const getWsUrl = (token: string | null) => {
  const host = window.location.host
  const prot = window.location.protocol

  if (!token) return null

  if (prot === 'https:') {
    return `wss://${host}/ws/?token=${token}`
  }

  return `ws://${host}/ws/?token=${token}`
}
