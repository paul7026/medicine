import * as yup from 'yup'

import { EditEmployeeScheduleFormValues } from './types'

const hasFromAndTo = (
  value?: EditEmployeeScheduleFormValues['work_time']
): boolean =>
  !value ||
  Object.values(value).every((slots) =>
    slots.every(
      (slot) =>
        typeof slot.from === 'number' &&
        !Number.isNaN(slot.from) &&
        typeof slot.to === 'number' &&
        !Number.isNaN(slot.to)
    )
  )

export const validationSchema = () =>
  yup
    .object({
      work_time: yup
        .mixed<EditEmployeeScheduleFormValues['work_time']>()
        .test(
          'slots-have-times',
          'Both start and end time are required',
          hasFromAndTo
        ),
    })
    .required() as yup.ObjectSchema<EditEmployeeScheduleFormValues>
