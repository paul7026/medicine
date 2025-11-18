import { ScheduleDay, ScheduleSlot } from '@entities/employee_schedules'

export interface CreateEmployeeScheduleFormProps {
  onClose: () => void
}

export interface CreateEmployeeScheduleFormValues {
  clinic: string
  employee: string
  filial: string
  work_time: Record<ScheduleDay, ScheduleSlot[]>
}

export interface FieldsProps {
  isMaintainer: boolean
}
