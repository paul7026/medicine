import { Alert as AlertMui, AlertTitle } from '@mui/material'

import { AlertProps } from '../model/types'

export const Alert = ({ title, subtitle, ...props }: AlertProps) => {
  return (
    <AlertMui {...props}>
      <AlertTitle>{title}</AlertTitle>
      {subtitle}
    </AlertMui>
  )
}
