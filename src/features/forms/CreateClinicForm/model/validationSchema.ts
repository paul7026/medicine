import * as Yup from 'yup'

import { CreateClinicFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<CreateClinicFormValues> =>
  Yup.object().shape({
    title: Yup.string().required().trim(),
    legal_name: Yup.string().required().trim(),
    managed_by: Yup.string().trim().required(),
    website: Yup.string().trim(),
    legal_address: Yup.string().trim(),
    phones: Yup.string().trim(),
    email: Yup.string().trim(),
    description: Yup.string().trim(),
  })
