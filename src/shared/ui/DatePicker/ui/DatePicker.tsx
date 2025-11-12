import {
  DatePicker as DatePickerMui,
  DatePickerProps as DatePickerPropsMui,
} from '@mui/x-date-pickers'

import dayjs from 'dayjs'

type DatePickerProps = DatePickerPropsMui<dayjs.Dayjs> & {
  error?: boolean
  errorMessage?: string
}

export const DatePicker = ({
  error,
  errorMessage,
  ...rest
}: DatePickerProps) => {
  return (
    <DatePickerMui
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
