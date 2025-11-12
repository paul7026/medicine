import {
  IconButtonProps as IconButtonPropsMui,
  TooltipProps,
} from '@mui/material'

export type IconButtonProps = IconButtonPropsMui & {
  tooltipTitle?: React.ReactNode
  tooltipPlacement?: TooltipProps['placement']
}
