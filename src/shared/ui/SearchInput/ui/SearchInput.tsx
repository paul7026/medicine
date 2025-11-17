import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, TextFieldProps } from '@mui/material'
import { debounce } from '@mui/material/utils'

import { ChangeEvent, useMemo } from 'react'

import { TextField } from '@shared/ui/TextField'

type SearchInputProps = Omit<TextFieldProps, 'onChange'> & {
  onChange: (data: string) => void
  placeholder?: string
}

export const SearchInput = ({
  onChange,
  placeholder,
  sx,
  ...rest
}: SearchInputProps) => {
  const changeHandler = useMemo(
    () =>
      debounce((e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
      }, 300),
    [onChange]
  )

  const resultPlaceholder = placeholder ?? 'Placeholder'

  return (
    <TextField
      id="search"
      placeholder={resultPlaceholder}
      size="small"
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      sx={sx}
      onChange={changeHandler}
      {...rest}
    />
  )
}
