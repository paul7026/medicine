import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import {
  Autocomplete as AutocompleteMui,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
} from '@mui/material'

import { TextField } from '@shared/ui/TextField'

import { AutocompleteProp } from '../model/types'

export const Autocomplete = <
  T extends string | { id: string; label: string },
  Multiple extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false,
>({
  id,
  sx,
  fullWidth,
  error,
  errorMessage,
  label,
  options,
  loading,
  disableClearable,
  onChange,
  ...props
}: AutocompleteProp<T, Multiple, FreeSolo>) => {
  const { multiple } = props

  const isOptionEqualToValue = (option: T, value: T) => {
    if (typeof option === 'object' && typeof value === 'object') {
      return option.id === value.id
    }

    return option === value
  }

  return (
    <FormControl error={error} fullWidth={fullWidth} id={id} sx={sx}>
      <AutocompleteMui
        {...props}
        disableClearable={(loading as FreeSolo) || disableClearable}
        disableCloseOnSelect={multiple ? true : false}
        isOptionEqualToValue={isOptionEqualToValue}
        loading={loading}
        multiple={multiple}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            label={label}
            slotProps={{
              input: {
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              },
            }}
          />
        )}
        renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props

          return (
            <li key={key} {...optionProps}>
              {multiple && (
                <Checkbox
                  checked={selected}
                  checkedIcon={<CheckBoxIcon fontSize="small" />}
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  style={{ marginRight: 8 }}
                />
              )}
              {typeof option === 'string' ? option : option.label}
            </li>
          )
        }}
        onChange={onChange}
      />

      {error && <FormHelperText>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}
