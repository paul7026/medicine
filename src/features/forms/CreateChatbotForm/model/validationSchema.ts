import { GridRowId } from '@mui/x-data-grid'

import * as Yup from 'yup'

import { CreateChatbotFormValues } from './types'

export const validationSchema = (
  isMaintainer: boolean,
  chatbotId: GridRowId | null | undefined
): Yup.ObjectSchema<CreateChatbotFormValues> =>
  Yup.object().shape({
    clinic_id:
      isMaintainer && !chatbotId
        ? Yup.string().required().trim()
        : Yup.string().trim(),
    platform: !chatbotId ? Yup.string().required().trim() : Yup.string().trim(),
    bot_token: Yup.string().required().trim(),
    api_key: Yup.string().required().trim(),
    webhook_url: Yup.string().required().trim(),
    config: Yup.string().required().trim(),
  })
