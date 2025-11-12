import { ReactNode } from 'react'

import { AlertProps } from '@shared/ui/Alert/model/types'

export interface SnackbarProviderProps {
  children: ReactNode
}

export interface CustomSnackbarProps {
  id: string | number
  message: string | React.ReactNode
  variant: 'default' | 'error' | 'success' | 'warning' | 'info'
  severity?: AlertProps['severity']
}
