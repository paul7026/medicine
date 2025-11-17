import * as Yup from 'yup'

import { CreateFilialFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean
): Yup.ObjectSchema<CreateFilialFormValues> =>
  Yup.object().shape({
    name: Yup.string().required(),
    timezone: Yup.string(),
    address: Yup.string().required(),
    address_data: Yup.string(),
    phones: Yup.string(),
    description: Yup.string(),
    social_media: Yup.string(),
    email: Yup.string().email(),
    clinic_id: isMaintainer ? Yup.string().required() : Yup.string(),
  })
