import * as Yup from 'yup'

import { EditUserFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<EditUserFormValues> =>
  Yup.object().shape({
    is_superuser: Yup.boolean().required(),
    password: Yup.string().required(),
    username: Yup.string().required(),
  })
