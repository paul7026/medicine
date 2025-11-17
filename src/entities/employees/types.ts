import { ReducerLoadingState } from '@shared/types'

export interface EmployeesState {
  employees: GetEmployeesResponse['items']
  employeesStatus: ReducerLoadingState

  employeeById: GetEmployeeByIdResponse | null
  employeeByIdStatus: ReducerLoadingState

  allEmployeesForForm: GetEmployeesResponse['items']
  allEmployeesForFormStatus: ReducerLoadingState

  selectedEmployeesForForm: GetEmployeesResponse['items']
  selectedEmployeesForFormStatus: ReducerLoadingState
}

export interface GetEmployeesResponse {
  items: {
    id: string
    name: string
    position: string
    specialization: string
    clinic_name: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface CreateEmployeePayload {
  name: string
  gender: string
  email?: string
  phone?: string
  position: string
  specialization: string
  work_experience?: number
  medical_degree?: string
  clinic_id?: string
}

export interface EditEmployeePayload {
  employee_id: string
  name: string
  position: string
  specialization: string
  clinic_id?: string
}

export interface GetEmployeeByIdResponse {
  id: string
  clinic_id: string
  name: string
  gender: string
  email: string
  phone: string
  position: string
  specialization: string
  work_experience: number
  medical_degree: string
  created_at: string
  updated_at: string
  filials: [
    {
      id: string
      name: string
      address: string
    },
  ]
  favours: [
    {
      id: string
      title: string
      duration: number
    },
  ]
  schedule_templates: [
    {
      id: string
      working_days: number[]
      start_time: number
      end_time: number
      break_start: number
      break_end: number
      slot_duration: number
    },
  ]
  schedule_exceptions: [
    {
      id: string
      filial_id: string
      date: string
      start_time: number
      end_time: number
      type: string
    },
  ]
}
