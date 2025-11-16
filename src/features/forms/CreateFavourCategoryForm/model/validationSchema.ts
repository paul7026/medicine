import { GridRowId } from '@mui/x-data-grid'

import * as Yup from 'yup'

import { CreateFavourCategoryFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean,
  categoryId: GridRowId | null | undefined
): Yup.ObjectSchema<CreateFavourCategoryFormValues> =>
  Yup.object().shape({
    title: Yup.string().required().trim(),
    clinic_id:
      isMaintainer && !categoryId
        ? Yup.string().required().trim()
        : Yup.string().trim(),
    description: Yup.string().trim(),
  })
