import {
  FormControlLabel,
  Switch as SwitchMui,
  SwitchProps as SwitchPropsMui,
} from '@mui/material'

import { ReactNode } from 'react'

export type SwitchProps = SwitchPropsMui & {
  label?: ReactNode
}

export const Switch = ({
  label,
  required,
  disabled,
  ...props
}: SwitchProps) => {
  return (
    <FormControlLabel
      control={<SwitchMui {...props} />}
      disabled={disabled}
      label={label}
      required={required}
    />
  )
}
