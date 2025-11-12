import {
  AutocompleteProps as AutocompletePropsMui,
  SxProps,
  Theme,
} from '@mui/material'

export interface AutocompleteProp<
  T,
  Multiple extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends Omit<
    AutocompletePropsMui<T, Multiple, FreeSolo, boolean | undefined>,
    'renderInput'
  > {
  error?: boolean
  sx?: SxProps<Theme>
  errorMessage?: string
  fullWidth?: boolean
  label?: string
}
