import { SelectProps as SelectPropsMui } from '@mui/material'
import { SxProps, Theme } from '@mui/material'

import { ReactElement, ReactNode } from 'react'

export type SelectItem = {
  id: string
  name: string | ReactNode
  value: string | number
  secondName?: string
  icon?: ReactElement
  subText?: string
}

export type SelectProps = SelectPropsMui & {
  selectItems: SelectItem[]
  label?: string
  sx?: SxProps<Theme>
  error?: boolean
  errorMessage?: string
  fullWidth?: boolean
  id?: string
  loading?: boolean
}
