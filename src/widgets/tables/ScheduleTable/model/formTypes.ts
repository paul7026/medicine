import dayjs from 'dayjs'

export interface ScheduleFiltersFormValues {
  clinic_id?: string
  filial_id?: string
  employee_id?: string
  start_time?: dayjs.Dayjs | null
  end_time?: dayjs.Dayjs | null
  format?: string
  is_available?: boolean
}
