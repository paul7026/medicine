import { ScheduleDay, ScheduleSlot } from '@entities/employee_schedules'

export interface EditEmployeeScheduleFormValues {
  work_time: Record<ScheduleDay, ScheduleSlot[]>
}

export interface EditEmployeeScheduleFormProps {
  scheduleId: string
  onClose: () => void
}
