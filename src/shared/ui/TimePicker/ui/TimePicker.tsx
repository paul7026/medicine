import {
  TimePicker as TimePickerMui,
  TimePickerProps as TimePickerPropsMui,
} from '@mui/x-date-pickers'

import dayjs from 'dayjs'

type TimePickerProps = TimePickerPropsMui<dayjs.Dayjs> & {
  error?: boolean
  errorMessage?: string
}
export const TimePicker = ({
  error,
  errorMessage,
  ...rest
}: TimePickerProps) => {
  return (
    <TimePickerMui
      slotProps={{
        textField: {
          error,
          helperText: errorMessage,
        },
      }}
      {...rest}
    />
  )
}
