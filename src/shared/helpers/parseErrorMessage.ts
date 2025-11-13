import { ErrorResponse } from '@shared/types'

export const parseErrorMessage = (err: unknown) => {
  const error = err as ErrorResponse

  const errorArray = error?.response?.data

  return errorArray
}
