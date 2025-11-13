import dayjs from 'dayjs'

export const formatIsoString = (isoString: string) =>
  dayjs(isoString).format('DD.MM.YYYY HH:mm')
