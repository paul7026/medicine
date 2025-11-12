import { AlertProps as AlertPropsMui } from '@mui/material'

export type AlertProps = AlertPropsMui & {
  title: string
  subtitle: string
}
