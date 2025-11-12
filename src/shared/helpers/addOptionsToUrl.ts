import { AddOptionsToUrlProps } from '@shared/types'

export const addOptionsToUrl = (
  objWithOptions: AddOptionsToUrlProps
): string => {
  let addToTheEndUrl: string = ''
  if (objWithOptions) {
    for (const [nameOption, value] of Object.entries(objWithOptions)) {
      addToTheEndUrl += `&${nameOption}=${value}`
    }
  }

  return addToTheEndUrl
}
