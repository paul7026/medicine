import * as Yup from 'yup'

import { ChangeEmployeesFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<ChangeEmployeesFormValues> =>
    Yup.object().shape({
      employees: Yup.array().default([]),
    })
