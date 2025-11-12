import { Popover as PopoverMui, PopoverProps } from '@mui/material'

export const Popover = ({ children, ...props }: PopoverProps) => {
  return <PopoverMui {...props}>{children}</PopoverMui>
}
