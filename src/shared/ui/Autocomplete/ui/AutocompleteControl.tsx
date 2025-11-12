import { useMemo } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'

import { Autocomplete } from './Autocomplete'

import { AutocompleteProp } from '../model/types'

type AutocompleteControlProps<
  T extends FieldValues,
  Multiple extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
> = Omit<
  AutocompleteProp<{ id: string; label: string }, Multiple, FreeSolo>,
  'options'
> & {
  form: UseFormReturn<T>
  name: Path<T>
  options: (string | { id: string; label: string })[]
}

export const AutocompleteControl = <
  T extends FieldValues,
  Multiple extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  form,
  name,
  options,
  ...autocompleteProps
}: AutocompleteControlProps<T, Multiple, FreeSolo>) => {
  const { control } = form

  const normalizedOptions = useMemo(() => {
    return options.map((option) =>
      typeof option === 'string' ? { id: option, label: option } : option
    )
  }, [options])

  return (
    <Controller
      control={control}
      name={name as Path<T>}
      render={({ field, fieldState }) => {
        const getDisplayValue = () => {
          if (autocompleteProps.multiple) {
            const selectedIds = field.value || []

            return normalizedOptions.filter((option) =>
              (selectedIds as string[]).includes(option.id)
            )
          } else {
            const selectedId = field.value

            return (
              normalizedOptions.find((option) => option.id === selectedId) ||
              null
            )
          }
        }

        return (
          <Autocomplete
            {...autocompleteProps}
            error={Boolean(fieldState.error)}
            errorMessage={fieldState.error?.message}
            options={normalizedOptions}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={getDisplayValue() as any}
            onChange={(_, value) => {
              if (autocompleteProps.multiple) {
                const selectedValues = value as { id: string; label: string }[]
                field.onChange(selectedValues.map((item) => item.id))
              } else {
                const selectedValue = value as {
                  id: string
                  label: string
                } | null
                field.onChange(selectedValue ? selectedValue.id : null)
              }
            }}
          />
        )
      }}
    />
  )
}
