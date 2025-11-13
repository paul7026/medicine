import * as Yup from 'yup'

import { EditAdminFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<EditAdminFormValues> =>
  Yup.object().shape({
    is_superuser: Yup.boolean().required(),
    password: Yup.string().required(),
    username: Yup.string().required(),
  })
