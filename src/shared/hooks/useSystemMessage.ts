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

  const addErrorMessage = (message: { detail: string | { msg: string }[] }) => {
    if (message.detail && typeof message.detail === 'string') {
      showErrorSnackbar(message.detail)
      return
    }

    if (message.detail && typeof message.detail === 'object') {
      message.detail.map((msg) => showErrorSnackbar(msg.msg))

      return
    }
  }

  const addSuccessMessage = (message: string) => {
    enqueueSnackbar(message, SUCCESS_CONFIG)
  }

  return { addErrorMessage, addSuccessMessage }
}
