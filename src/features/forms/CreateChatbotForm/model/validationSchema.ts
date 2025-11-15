import * as Yup from 'yup'

import { CreateChatbotFormValues } from './types'

export const validationSchema = (): Yup.ObjectSchema<CreateChatbotFormValues> =>
  Yup.object().shape({
    clinic_id: Yup.string().required().trim(),
    platform: Yup.string().required().trim(),
    bot_token: Yup.string().required().trim(),
    api_key: Yup.string().required().trim(),
    webhook_url: Yup.string().required().trim(),
    config: Yup.string().required().trim(),
  })
