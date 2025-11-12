import { IconButton as IconButtonMui, Tooltip } from '@mui/material'

import { IconButtonProps } from '../model/types'

export const IconButton = ({
  children,
  tooltipTitle,
  tooltipPlacement = 'bottom',
  ...props
}: IconButtonProps) => {
  return (
    <Tooltip placement={tooltipPlacement} title={tooltipTitle}>
      <span>
        <IconButtonMui {...props}>{children}</IconButtonMui>
      </span>
    </Tooltip>
  )
}
