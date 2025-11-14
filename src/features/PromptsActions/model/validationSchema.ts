import * as Yup from 'yup'

import { CreatePromptFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<CreatePromptFormValues> =>
  Yup.object().shape({
    name: Yup.string().required(),
    content: Yup.string(),
    clinic_id: Yup.string().required(),
  })
