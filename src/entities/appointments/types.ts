import { ReducerLoadingState } from '@shared/types'

export interface AppointmentsState {
  appointments: GetAppointmentsResponse['items']
  appointmentsStatus: ReducerLoadingState

  appointmentById: GetAppointmentByIdResponse | null
  appointmentByIdStatus: ReducerLoadingState
}

export interface GetAppointmentsResponse {
  items: {
    id: string
    start_time: string
    end_time: string
    format: string
    status: string
    user_name: string
    filial_name: string
    employee_name: string
    favour_name: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface GetAppointmentByIdResponse {
  id: string
  external_id: string
  start_time: string
  end_time: string
  format: string
  status: string
  user_id: string
  filial_id: string
  employee_id: string
  favour_id: string
  clinic_id: string
  contact: string
  conversation: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface EditAppointmentPayload {
  appointment_id: string
  clinic_id?: string
  user_id?: string
  status: string
  contact?: string
  favour_id: string
  filial_id: string
  employee_id?: string
  slot_id: string
}

export interface CreateAppointmentPayload {
  clinic_id?: string
  user_id?: string
  status: string
  contact?: string
  favour_id: string
  filial_id: string
  employee_id?: string
  slot_id: string
}
