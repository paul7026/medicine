import { useSnackbar } from 'notistack'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { ErrorResponse } from '@shared/types'

const ERROR_CONFIG = {
  autoHideDuration: 7000,
  variant: 'error' as const,
  preventDuplicate: true,
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'right' as const,
  },
}

const SUCCESS_CONFIG = {
  autoHideDuration: 5000,
  variant: 'success' as const,
  preventDuplicate: true,
  anchorOrigin: {
    vertical: 'bottom' as const,
    horizontal: 'right' as const,
  },
}

export const useSystemMessage = () => {
  const { enqueueSnackbar } = useSnackbar()

  const showErrorSnackbar = (message: string) => {
    enqueueSnackbar(message, ERROR_CONFIG)
  }

  const addErrorMessage = <T extends FieldValues>(
    messages: ErrorResponse['response']['data']['errors'],
    setError?: UseFormSetError<T>
  ) => {
    messages.forEach((message) => {
      const { detail, non_field_errors, msg_key } = message

      if (detail) {
        showErrorSnackbar(detail)
        return
      }

      if (non_field_errors) {
        showErrorSnackbar(non_field_errors)
        return
      }

      const fieldName = msg_key as Path<T>
      const fieldErrorMessage =
        fieldName && fieldName in message
          ? (message[fieldName] as string)
          : undefined

      if (fieldName && fieldErrorMessage && setError) {
        setError(fieldName, {
          type: 'server',
          message: fieldErrorMessage,
        })
      }
    })
  }

  const addSuccessMessage = (message: string) => {
    enqueueSnackbar(message, SUCCESS_CONFIG)
  }

  return { addErrorMessage, addSuccessMessage }
}
