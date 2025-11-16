import { GridRowId } from '@mui/x-data-grid'

import * as Yup from 'yup'

import { CreateFavourFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean,
  favourId: GridRowId | null | undefined
): Yup.ObjectSchema<CreateFavourFormValues> =>
  Yup.object().shape({
    title: Yup.string().required().trim(),
    favour_category_id: Yup.string().required().trim(),
    clinic_id:
      isMaintainer && !favourId
        ? Yup.string().required().trim()
        : Yup.string().trim(),
    comment: Yup.string().trim(),
    duration: Yup.number().typeError('Duration must be a number'),
    online_switch_on: Yup.boolean(),
    price: Yup.number().typeError('Price must be a number'),
    currency: Yup.string().trim(),
  })
