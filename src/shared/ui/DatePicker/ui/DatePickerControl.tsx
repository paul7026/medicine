import { DatePickerProps } from '@mui/x-date-pickers'

import dayjs from 'dayjs'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { DatePicker } from './DatePicker'

type DatePickerControlProps<T extends FieldValues> =
  DatePickerProps<dayjs.Dayjs> & {
    form: UseFormReturn<T, unknown, undefined>
    name: Path<T>
  }

export const DatePickerControl = <T extends FieldValues>({
  form,
  name,
  ...datePickerProps
}: DatePickerControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DatePicker
          {...field}
          {...datePickerProps}
          error={Boolean(fieldState.error)}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  )
}
