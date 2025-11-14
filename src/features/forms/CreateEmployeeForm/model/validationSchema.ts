import * as Yup from 'yup'

import { CreateEmployeeFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<CreateEmployeeFormValues> =>
    Yup.object().shape({
      name: Yup.string().required().trim(),
      gender: Yup.string().required().trim(),
      position: Yup.string().required().trim(),
      specialization: Yup.string().required().trim(),
      clinic_id: Yup.string().required().trim(),
      email: Yup.string().trim(),
      phone: Yup.string().trim(),
      work_experience: Yup.number().typeError(
        'Work experience must be a number'
      ),
      medical_degree: Yup.string().trim(),
    })
