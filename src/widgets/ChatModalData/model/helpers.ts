import { formatIsoString } from '@shared/helpers/formatIsoString'

type ChatById = {
  id: string
  user_id: string
  channel: string
  current_intent: string
  previous_intent: string
  is_closed: boolean
  created_at: string
  updated_at: string
}

export const getData = (chatById: ChatById) => {
  return [
    { title: 'id', subtitle: chatById.id },
    { title: 'user_id', subtitle: chatById.user_id },
    { title: 'channel', subtitle: chatById.channel },
    { title: 'current_intent', subtitle: chatById.current_intent },
    { title: 'previous_intent', subtitle: chatById.previous_intent },
    {
      title: 'is_closed',
      subtitle: chatById.is_closed ? 'Yes' : 'No',
    },
    { title: 'created_at', subtitle: formatIsoString(chatById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(chatById.updated_at) },
  ]
}
