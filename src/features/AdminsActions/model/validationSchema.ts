import * as Yup from 'yup'

import { CreateAdminFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<CreateAdminFormValues> =>
  Yup.object().shape({
    is_superuser: Yup.boolean().required(),
    tenant: Yup.string().required(),
    clinic: Yup.string(),
    password: Yup.string().required(),
    username: Yup.string().required(),
  })
