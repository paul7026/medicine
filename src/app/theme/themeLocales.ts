import { ruRU as coreRuLocales } from '@mui/material/locale'
import { ruRU as muiXRuLocales } from '@mui/x-data-grid/locales'
import { ruRU as datePickerRuLocales } from '@mui/x-date-pickers/locales'

const storedLng = localStorage.getItem('lng')
const lng: 'en' | 'ru' = storedLng ? JSON.parse(storedLng) : 'ru'

const locales = {
  en: {},
  ru: {
    ...coreRuLocales,
    ...muiXRuLocales,
    ...datePickerRuLocales,
    components: {
      ...coreRuLocales.components,
      ...muiXRuLocales.components,
      ...datePickerRuLocales.components,
    },
  },
}

export default locales[lng]
