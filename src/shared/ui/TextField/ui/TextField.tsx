import { TextField as TextFieldMui, TextFieldProps } from '@mui/material'

export const TextField = ({
  variant = 'outlined',
  ...rest
}: TextFieldProps) => {
  return <TextFieldMui variant={variant} {...rest} />
}
