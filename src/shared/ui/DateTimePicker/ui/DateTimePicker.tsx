import {
  DateTimePicker as DateTimePickerMui,
  DateTimePickerProps as DateTimePickerPropsMui,
} from '@mui/x-date-pickers'

import dayjs from 'dayjs'

type DateTimePickerProps = DateTimePickerPropsMui<dayjs.Dayjs> & {
  error?: boolean
  errorMessage?: string
}

export const DateTimePicker = ({
  error,
  errorMessage,
  ...rest
}: DateTimePickerProps) => {
  return (
    <DateTimePickerMui
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
