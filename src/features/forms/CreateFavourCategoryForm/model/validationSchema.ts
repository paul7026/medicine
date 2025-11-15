import * as Yup from 'yup'

import { CreateFavourCategoryFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<CreateFavourCategoryFormValues> =>
    Yup.object().shape({
      title: Yup.string().required().trim(),
      clinic_id: Yup.string().required().trim(),
      description: Yup.string().trim(),
    })
