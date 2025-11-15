export interface PaginationParams {
  page?: number
  per_page?: number
  [key: string]: string | number | boolean | undefined
}

export const buildPaginationQueryString = <
  T extends { page?: number; per_page?: number },
>(
  params: T | void
): string => {
  const urlParams = new URLSearchParams()

  if (params) {
    // Handle pagination parameters with conversion
    if (params.page !== undefined) {
      urlParams.append('page', String(params.page + 1))
    }
    if (params.per_page !== undefined) {
      urlParams.append('per_page', String(params.per_page))
    }

    // Handle any additional parameters
    Object.entries(params).forEach(([key, value]) => {
      // Skip pagination params as they're already handled above
      if (key === 'page' || key === 'per_page') {
        return
      }

      // Only append defined values (exclude undefined, null, empty strings)
      if (value !== undefined && value !== null) {
        const stringValue = String(value)
        if (stringValue !== '') {
          urlParams.append(key, stringValue)
        }
      }
    })
  }

  const queryString = urlParams.toString()

  return queryString ? `?${queryString}` : ''
}
