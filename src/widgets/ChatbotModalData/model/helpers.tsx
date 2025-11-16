import { GetChatbotByIdResponse } from '@entities/chatbots'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { Link } from '@shared/ui/Link'

export const getData = (
  chatbotById: GetChatbotByIdResponse,
  onClinicClick: () => void
) => {
  return [
    { title: 'id', subtitle: chatbotById.id },
    {
      title: 'clinic_id',
      subtitle: (
        <Link color="info" variant="button" onClick={onClinicClick}>
          {chatbotById.clinic_id}
        </Link>
      ),
    },
    { title: 'platform', subtitle: chatbotById.platform },
    {
      title: 'bot_token',
      subtitle: chatbotById.bot_token ? chatbotById.bot_token : '--',
    },
    {
      title: 'api_key',
      subtitle: chatbotById.api_key,
    },
    {
      title: 'webhook_url',
      subtitle: chatbotById.webhook_url,
    },
    {
      title: 'config',
      subtitle: chatbotById.config
        ? JSON.stringify(chatbotById.config, null, 2)
        : '--',
    },
    {
      title: 'created_at',
      subtitle: formatIsoString(chatbotById.created_at),
    },
    {
      title: 'updated_at',
      subtitle: formatIsoString(chatbotById.updated_at),
    },
  ]
}
