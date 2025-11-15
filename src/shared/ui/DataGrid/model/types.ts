import { SxProps, Theme } from '@mui/material'

import { ReactNode } from 'react'

type DataGridItemBase = {
  title: string | number
  subtitle: string | number | ReactNode
  id?: string
  link?: string
}

export type DataGridItemWithAction = DataGridItemBase & {
  onClick: () => void
  tooltipTitle: string
}

export type DataGridItemWithoutAction = DataGridItemBase & {
  onClick?: never
  tooltipTitle?: never
}

type DataGridItem = (DataGridItemWithAction | DataGridItemWithoutAction) & {
  noWrap?: boolean
  renderAdditionalBtn?: ReactNode
}

export interface DataGridProps {
  data: DataGridItem[]
  sx?: SxProps<Theme>
  dense?: boolean
  subtitleMaxWidth?: string
  wordBreakOff?: boolean
}
