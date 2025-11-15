import * as Yup from 'yup'

import { ChangeFilialsFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<ChangeFilialsFormValues> =>
  Yup.object().shape({
    filials: Yup.array().default([]),
  })
