import * as Yup from 'yup'

import { EditScheduleConnectionFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<EditScheduleConnectionFormValues> =>
    Yup.object().shape({
      partner_token: Yup.string().trim(),
      user_token: Yup.string().trim(),
      login: Yup.string().trim(),
      password: Yup.string().trim(),
    })
