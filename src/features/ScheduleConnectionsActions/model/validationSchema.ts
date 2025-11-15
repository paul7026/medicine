import * as Yup from 'yup'

import { CreateScheduleConnectionFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<CreateScheduleConnectionFormValues> =>
    Yup.object().shape({
      clinic_id: Yup.string().required().trim(),
      type: Yup.string().required().trim(),
      partner_token: Yup.string().trim(),
      user_token: Yup.string().trim(),
      login: Yup.string().trim(),
      password: Yup.string().trim(),
    })
