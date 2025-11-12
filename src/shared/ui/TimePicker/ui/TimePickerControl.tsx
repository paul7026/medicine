import { TimePickerProps as TimePickerPropsMui } from '@mui/x-date-pickers'

import dayjs from 'dayjs'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { TimePicker } from './TimePicker'

type TimePickerControlProps<T extends FieldValues> =
  TimePickerPropsMui<dayjs.Dayjs> & {
    form: UseFormReturn<T, unknown, undefined>
    name: Path<T>
  }

export const TimePickerControl = <T extends FieldValues>({
  form,
  name,
  ...timePickerProps
}: TimePickerControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TimePicker
          {...field}
          {...timePickerProps}
          error={Boolean(fieldState.error)}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  )
}
