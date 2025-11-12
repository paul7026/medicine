import { FieldValues, Path, PathValue, useWatch } from 'react-hook-form'

import theme from '@app/theme'

import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { TextFieldControl } from '@shared/ui/TextField'

import { AddableValuesFieldProps } from '../model/types'

/**
 * Пропсы компонента AddableValuesField
 *
 * @prop autocompleteLabel - Autocomplete autocompleteLabel
 * @prop autocompleteName - Autocomplete name
 * @prop autocompleteOptions - Autocomplete options
 *
 */
export const AddableValuesField = <T extends FieldValues>({
  form,
  autocompleteLabel,
  inputLabel,
  autocompleteName,
  inputName,
  autocompleteOptions,
  onNewOptionAdd,
}: AddableValuesFieldProps<T>) => {
  const { control, watch, getValues, setValue } = form

  const inputValue = useWatch({
    control,
    name: inputName,
  }) as string

  const handleAdd = () => {
    const value = watch(inputName)?.trim()
    const currentList = (getValues(autocompleteName) as string[]) || []

    if (!value) return

    const isDuplicate = [...currentList, ...autocompleteOptions].includes(value)
    if (!isDuplicate) {
      const newList = [...autocompleteOptions, value]
      onNewOptionAdd(newList)
      setValue(autocompleteName, [...currentList, value] as PathValue<
        T,
        Path<T>
      >)
    }

    setValue(inputName, '' as PathValue<T, Path<T>>)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${theme.palette.grey[300]}`,
        p: 1.5,
        borderRadius: '4px',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextFieldControl
          form={form}
          label={inputLabel}
          name={inputName}
          sx={{ width: '70%' }}
        />
        <Button
          disabled={!inputValue?.trim()}
          sx={{ width: '30%', height: 56 }}
          variant="outlined"
          onClick={handleAdd}
        >
          Добавить
        </Button>
      </Box>

      <AutocompleteControl
        fullWidth
        multiple
        form={form}
        label={autocompleteLabel}
        limitTags={2}
        name={autocompleteName}
        options={autocompleteOptions}
      />
    </Box>
  )
}
