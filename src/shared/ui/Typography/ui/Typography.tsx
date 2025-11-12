import {
  Tooltip,
  Typography as TypographyMui,
  TypographyProps as TypographyPropsMui,
} from '@mui/material'

type TypographyProps = TypographyPropsMui

export const Typography = ({ noWrap, children, ...props }: TypographyProps) => {
  if (noWrap) {
    return (
      <Tooltip title={children}>
        <TypographyMui {...props} noWrap={noWrap}>
          {children}
        </TypographyMui>
      </Tooltip>
    )
  }

  return <TypographyMui {...props}>{children}</TypographyMui>
}
