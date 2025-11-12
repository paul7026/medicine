import ErrorIcon from '@mui/icons-material/Error'

import i18n from '@app/language'

import { Chip } from '@shared/ui/Chip'

import { COLOR_MAP, ICON_MAP } from '../constants'
import { getLabelMap } from '../getLabelMap'
import { RenderCellParams } from '../types'

export const renderChip = ({
  value,
  successLabel,
  unSuccessLabel,
}: RenderCellParams) => {
  const { t } = i18n

  const getLabel = (): string => {
    const labelMap = getLabelMap(t, successLabel, unSuccessLabel)

    return labelMap[value as keyof typeof labelMap] || t('RENDER_CHIP.ERROR')
  }

  return (
    <Chip
      color={COLOR_MAP[value as keyof typeof COLOR_MAP] || 'error'}
      icon={
        ICON_MAP[value as keyof typeof ICON_MAP] || (
          <ErrorIcon fontSize="small" />
        )
      }
      label={getLabel()}
      variant="outlined"
    />
  )
}
