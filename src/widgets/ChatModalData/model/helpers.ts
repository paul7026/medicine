import { ChatById, ChatHistoryItem } from '@entities/chats'

import { formatIsoString } from '@shared/helpers/formatIsoString'

export const getData = (chatById: ChatById) => {
  return [
    { title: 'id', subtitle: chatById.id },
    { title: 'user_id', subtitle: chatById.user_id },
    { title: 'channel', subtitle: chatById.channel },
    { title: 'current_intent', subtitle: String(chatById.current_intent) },
    { title: 'previous_intent', subtitle: String(chatById.previous_intent) },
    {
      title: 'is_active',
      subtitle: chatById.is_active ? 'Yes' : 'No',
    },
    { title: 'created_at', subtitle: formatIsoString(chatById.created_at) },
    { title: 'updated_at', subtitle: formatIsoString(chatById.updated_at) },
  ]
}

export const getBackgroundColor = (message: ChatHistoryItem) => {
  const isAssistant = message.role === 'assistant'
  const isModerator = message.role === 'moderator'
  const isUser = message.role === 'user'

  if (isUser) return '#f5f5f5'

  if (isAssistant) return '#1976d2'

  if (isModerator) return '#00acc1'

  return '#1976d2'
}

export const getTextColor = (message: ChatHistoryItem) => {
  const isUser = message.role === 'user'

  if (isUser) return '#000'

  return '#fff'
}
