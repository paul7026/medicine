import { SnackbarProps as SnackbarPropsMui } from '@mui/material'

export type Severity = 'error' | 'warning' | 'info' | 'success'

export type SnackbarProps = SnackbarPropsMui & {
  severity: Severity
}
