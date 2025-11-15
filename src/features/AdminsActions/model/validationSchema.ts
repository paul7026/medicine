import * as Yup from 'yup'

import { CreateAdminFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean
): Yup.ObjectSchema<CreateAdminFormValues> =>
  Yup.object().shape({
    is_superuser: Yup.boolean().required(),
    tenant: isMaintainer
      ? Yup.string().required('Tenant is required')
      : Yup.string(),
    clinic_id: Yup.string(),
    password: Yup.string()
      .required()
      .min(8, 'Password should have at least 8 characters'),
    username: Yup.string().required(),
  })
