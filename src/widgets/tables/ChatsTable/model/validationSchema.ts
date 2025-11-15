import * as Yup from 'yup'

import { EditChatsFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<EditChatsFormValues> =>
  Yup.object().shape({
    message: Yup.string().required('Message is required'),
  })
