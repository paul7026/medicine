import i18n from '@app/language'

const { t } = i18n

export const formatSecToString = (sec: number) => {
  const day = sec < 86400 ? 0 : Math.floor(sec / 86400)
  const hours = sec < 3600 ? 0 : Math.floor((sec % 86400) / 3600)
  const min = sec < 60 ? 0 : Math.floor((sec % 3600) / 60)

  return `${day}${t('FORMAT_SEC_STR.DAY')} ${hours}${t('FORMAT_SEC_STR.HOUR')} ${min}${t('FORMAT_SEC_STR.MIN')}`
}
