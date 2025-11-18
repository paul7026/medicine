import { ReducerLoadingState } from '@shared/types'

export interface EmployeeSchedulesState {
  employeeSchedules: GetEmployeeScheduleResponse['items']
  employeeSchedulesStatus: ReducerLoadingState

  employeeScheduleById: GetEmployeeScheduleByIdResponse | null
  employeeScheduleByIdStatus: ReducerLoadingState
}

export interface GetEmployeeScheduleResponse {
  items: {
    id: string
    employee_name: string
    position: string
    filial_name: string
    clinic_name: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface TimeSlot {
  from_minutes: number
  to_minutes: number
}

export interface DaySchedule {
  day: string
  is_weekend: boolean
  slots: TimeSlot[]
}

export interface WorkTimeTable {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface GetEmployeeScheduleByIdResponse {
  id: string
  employee_id: string
  filial_id: string
  clinic_id: string
  name: string
  gender: string
  position: string
  specialization: string
  work_experience: number
  medical_degree: string
  created_at: string
  updated_at: string
  work_time: Record<ScheduleDay, ScheduleSlot[]>
  work_time_table: Record<ScheduleDay, ScheduleSlot[]>
}

export interface CreateEmployeeSchedulePayload {
  employee: string
  filial: string
  work_time: Record<ScheduleDay, ScheduleSlot[]>
  clinic: string
}

export interface EditEmployeeSchedulePayload {
  schedule_id: string
  work_time: Record<string, unknown>
}

export type ScheduleDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export interface ScheduleSlot {
  from: number
  to: number
}
