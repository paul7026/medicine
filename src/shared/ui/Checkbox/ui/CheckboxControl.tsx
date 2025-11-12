import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Checkbox, CheckboxProps } from './Checkbox'

type CheckboxControlProps<T extends FieldValues> = CheckboxProps & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<T, any, undefined>
  name: Path<T>
}

export const CheckboxControl = <T extends FieldValues>({
  form,
  name,
  ...checkboxProps
}: CheckboxControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <Checkbox {...field} {...checkboxProps} />}
    />
  )
}
