import * as Yup from 'yup'

import { EditFilialFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<EditFilialFormValues> =>
  Yup.object().shape({
    name: Yup.string().required(),
    timezone: Yup.string(),
    address: Yup.string().required(),
    address_data: Yup.string(),
    phones: Yup.string(),
    description: Yup.string(),
    social_media: Yup.string(),
    email: Yup.string().email(),
  })
