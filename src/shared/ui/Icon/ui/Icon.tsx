import { Icon as IconMui, IconProps } from '@mui/material'

export const Icon = ({ children, ...props }: IconProps) => {
  return (
    <IconMui {...props} className="material-symbols-outlined">
      {children}
    </IconMui>
  )
}
