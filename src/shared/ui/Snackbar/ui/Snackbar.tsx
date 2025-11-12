import { Alert, Snackbar as SnackbarMui } from '@mui/material'

import { useState } from 'react'

import { DEFAULT_MESSAGE_MAP } from './model/constants'
import { SnackbarProps } from './model/types'

export const Snackbar = ({ severity, message, ...props }: SnackbarProps) => {
  const [open, setOpen] = useState(true)

  const closeHandler = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <SnackbarMui
      {...props}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={20000}
      open={open}
      onClose={closeHandler}
    >
      <Alert severity={severity} sx={{ maxWidth: 500 }} onClose={closeHandler}>
        {message || DEFAULT_MESSAGE_MAP[severity]}
      </Alert>
    </SnackbarMui>
  )
}
