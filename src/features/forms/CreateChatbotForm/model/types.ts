import { GridRowId } from '@mui/x-data-grid'

export interface CreateChatbotFormProps {
  chatbotId?: GridRowId | null
  onClose: () => void
}

export interface CreateChatbotFormValues {
  clinic_id: string
  platform: string
  bot_token: string
  api_key: string
  webhook_url: string
  config: string | null
}
