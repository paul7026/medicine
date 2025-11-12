import {
  Checkbox as CheckboxMui,
  CheckboxProps as CheckboxPropsMui,
  FormControlLabel,
} from '@mui/material'

export type CheckboxProps = CheckboxPropsMui & {
  label?: string
}

export const Checkbox = ({ label, ...rest }: CheckboxProps) => {
  return <FormControlLabel control={<CheckboxMui {...rest} />} label={label} />
}
