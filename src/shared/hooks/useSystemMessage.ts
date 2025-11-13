import { useSnackbar } from 'notistack'

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

  const addErrorMessage = (message: { detail: string }) => {
    if (message.detail) {
      showErrorSnackbar(message.detail)
      return
    }
  }

  const addSuccessMessage = (message: string) => {
    enqueueSnackbar(message, SUCCESS_CONFIG)
  }

  return { addErrorMessage, addSuccessMessage }
}
