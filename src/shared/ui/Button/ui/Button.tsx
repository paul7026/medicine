import { ButtonProps, Button as MuiButton } from '@mui/material'

import { forwardRef } from 'react'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return <MuiButton {...props} ref={ref} />
  }
)
