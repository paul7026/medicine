import { DateTimePickerProps as DateTimePickerPropsMui } from '@mui/x-date-pickers'

import dayjs from 'dayjs'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { DateTimePicker } from './DateTimePicker'

type DateTimePickerControlProps<T extends FieldValues> =
  DateTimePickerPropsMui<dayjs.Dayjs> & {
    form: UseFormReturn<T, unknown, undefined>
    name: Path<T>
  }

export const DateTimePickerControl = <T extends FieldValues>({
  form,
  name,
  ...datePickerProps
}: DateTimePickerControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <DateTimePicker
          {...field}
          {...datePickerProps}
          error={Boolean(fieldState.error)}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  )
}
