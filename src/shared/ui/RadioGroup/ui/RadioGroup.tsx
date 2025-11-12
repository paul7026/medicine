import {
  FormControlLabel,
  Radio,
  RadioGroup as RadioGroupMui,
} from '@mui/material'

import { RadioGroupProps } from '../model/types'

export const RadioGroup = ({ radioGroupList, ...rest }: RadioGroupProps) => {
  return (
    <RadioGroupMui {...rest} name="radio-buttons-group">
      {radioGroupList.map((radio) => (
        <FormControlLabel
          key={radio.id}
          control={<Radio />}
          label={radio.label}
          value={radio.value}
        />
      ))}
    </RadioGroupMui>
  )
}
