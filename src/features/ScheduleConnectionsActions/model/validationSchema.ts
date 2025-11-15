import * as Yup from 'yup'

import { CreateScheduleConnectionFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean
): Yup.ObjectSchema<CreateScheduleConnectionFormValues> =>
  Yup.object().shape({
    clinic_id: isMaintainer
      ? Yup.string().required().trim()
      : Yup.string().trim(),
    type: Yup.string().required().trim(),
    partner_token: Yup.string().trim(),
    user_token: Yup.string().trim(),
    login: Yup.string().trim(),
    password: Yup.string().trim(),
  })
