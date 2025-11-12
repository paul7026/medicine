import { Alert, AlertProps } from '@mui/material'

import { SnackbarContent, SnackbarProvider, useSnackbar } from 'notistack'
import { forwardRef } from 'react'

import { CustomSnackbarProps, SnackbarProviderProps } from './types'

const CustomSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>(
  function CustomSnackbar({ id, message, variant, severity }, ref) {
    const { closeSnackbar } = useSnackbar()

    const alertSeverity: AlertProps['severity'] =
      severity ||
      ((variant === 'default' ? 'info' : variant) as AlertProps['severity'])

    return (
      <SnackbarContent ref={ref}>
        <Alert
          severity={alertSeverity}
          sx={{ maxWidth: 500 }}
          onClose={() => closeSnackbar(id)}
        >
          {message}
        </Alert>
      </SnackbarContent>
    )
  }
)

export const SnackbarCustomProvider = ({ children }: SnackbarProviderProps) => {
  return (
    <SnackbarProvider
      Components={{
        success: CustomSnackbar,
        error: CustomSnackbar,
        info: CustomSnackbar,
        warning: CustomSnackbar,
      }}
      maxSnack={4}
    >
      {children}
    </SnackbarProvider>
  )
}
