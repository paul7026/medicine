import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Select } from './Select'

import { SelectItem, SelectProps } from '../model/types'

type SelectControlProps<T extends FieldValues> = SelectProps & {
  form: UseFormReturn<T, unknown, undefined>
  name: Path<T>
  selectItems: SelectItem[]
}

export const SelectControl = <T extends FieldValues>({
  form,
  name,
  selectItems,
  ...selectProps
}: SelectControlProps<T>) => {
  const { control } = form

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          {...selectProps}
          error={Boolean(fieldState.error)}
          errorMessage={fieldState.error?.message}
          selectItems={selectItems}
        />
      )}
    />
  )
}
