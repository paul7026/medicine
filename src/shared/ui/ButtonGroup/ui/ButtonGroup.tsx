import { ButtonGroup as ButtonGroupMui, ButtonGroupProps } from '@mui/material'

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => {
  return <ButtonGroupMui {...props}>{children}</ButtonGroupMui>
}
