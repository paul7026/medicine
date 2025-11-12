import { MuiColorInput, MuiColorInputProps } from 'mui-color-input'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

type ColorInputControlProps<T extends FieldValues> = Omit<
  MuiColorInputProps,
  'value'
> & {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
}

export const ColorInputControl = <T extends FieldValues>({
  form,
  name,
  ...props
}: ColorInputControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <MuiColorInput
          {...field}
          {...props}
          isAlphaHidden
          error={Boolean(fieldState.error)}
          format="hex"
          helperText={fieldState.error?.message as string}
        />
      )}
    />
  )
}
