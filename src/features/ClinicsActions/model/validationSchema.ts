import * as Yup from 'yup'

import { CreateClinicFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<CreateClinicFormValues> =>
  Yup.object().shape({
    is_superuser: Yup.boolean().required(),
    tenant: Yup.string().required(),
    clinic_id: Yup.string(),
    password: Yup.string()
      .required()
      .min(8, 'Password should have at least 8 characters'),
    username: Yup.string().required(),
  })
