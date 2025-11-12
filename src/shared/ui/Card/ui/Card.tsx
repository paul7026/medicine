import {
  CardActions,
  CardContent,
  CardContentProps,
  CardHeader,
  Card as CardMui,
  CardProps as CardPropsMui,
  Divider,
} from '@mui/material'

import React from 'react'

export type CardProps = CardPropsMui & {
  cardContentProps?: CardContentProps
  header?: React.ReactNode
  actions?: React.ReactNode
}

export const Card = ({
  children,
  header,
  cardContentProps,
  actions,
  ...props
}: CardProps) => {
  return (
    <CardMui {...props}>
      {header && (
        <>
          <CardHeader title={header} />
          <Divider />
        </>
      )}

      <CardContent {...cardContentProps}>{children}</CardContent>

      {actions && (
        <>
          <Divider />
          <CardActions>{actions}</CardActions>
        </>
      )}
    </CardMui>
  )
}
