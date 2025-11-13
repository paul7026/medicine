import * as Yup from 'yup'

import { LoginFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<LoginFormValues> =>
  Yup.object().shape({
    password: Yup.string().required(),
    username: Yup.string().required(),
  })
