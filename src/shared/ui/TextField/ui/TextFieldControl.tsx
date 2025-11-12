import { TextField, TextFieldProps } from '@mui/material'

import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type TextFieldControlProps<T extends FieldValues> = TextFieldProps & {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const TextFieldControl = <T extends FieldValues>({
  form,
  name,
  ...textFieldProps
}: TextFieldControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          error={Boolean(fieldState.error)}
          helperText={fieldState.error?.message as string}
        />
      )}
    />
  )
}
