import { RadioGroupProps as RadioGroupPropsMui } from '@mui/material'

export interface RadioGroupItem {
  id: string
  value: string
  label: string
}

export type RadioGroupProps = RadioGroupPropsMui & {
  radioGroupList: RadioGroupItem[]
}
