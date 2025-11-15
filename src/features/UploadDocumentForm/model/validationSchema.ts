import * as Yup from 'yup'

import { UploadDocumentFormValues } from './types'

export const validationSchema =
  (): Yup.ObjectSchema<UploadDocumentFormValues> =>
    Yup.object().shape({
      name: Yup.string().required().trim(),
      clinic_id: Yup.string().required().trim(),
      file: Yup.mixed<File>()
        .required('File not selected')
        .test('is-file', 'File not selected', (value) => value instanceof File),
    })
