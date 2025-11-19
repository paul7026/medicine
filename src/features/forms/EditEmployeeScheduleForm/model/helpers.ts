import { ScheduleDay, ScheduleSlot } from '@entities/employee_schedules'

import { CreateEmployeeScheduleFormValues } from '@features/forms/CreateEmployeeScheduleForm/model/types'

import { DAYS } from './constants'

export const createDefaultWorkTime =
  (): CreateEmployeeScheduleFormValues['work_time'] => ({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })

export const normalizeWorkTime = (
  workTime?: Partial<Record<ScheduleDay, ScheduleSlot[]>>
): Record<ScheduleDay, ScheduleSlot[]> => {
  if (!workTime) {
    return createDefaultWorkTime()
  }

  return DAYS.reduce<Record<ScheduleDay, ScheduleSlot[]>>((acc, day) => {
    acc[day] = (workTime[day] ?? []).map((slot) => ({
      from: slot.from,
      to: slot.to,
    }))

    return acc
  }, createDefaultWorkTime())
}
