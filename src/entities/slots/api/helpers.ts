import { GetSlotsPayload } from '../types'

export const buildSlotsQueryString = (
  payload: GetSlotsPayload | void
): string => {
  const params = new URLSearchParams()

  if (payload) {
    if (payload.page !== undefined) {
      params.append('page', String(payload.page + 1))
    }
    if (payload.per_page !== undefined) {
      params.append('per_page', String(payload.per_page))
    }
    if (payload.clinic_id) {
      params.append('clinic_id', payload.clinic_id)
    }
    if (payload.filial_id) {
      params.append('filial_id', payload.filial_id)
    }
    if (payload.employee_id) {
      params.append('employee_id', payload.employee_id)
    }
    if (payload.start_time) {
      params.append('start_time', payload.start_time)
    }
    if (payload.end_time) {
      params.append('end_time', payload.end_time)
    }
    if (payload.format) {
      params.append('format', payload.format)
    }
    if (payload.is_available !== undefined) {
      params.append('is_available', String(payload.is_available))
    }
  }

  const queryString = params.toString()

  return queryString ? `?${queryString}` : ''
}
