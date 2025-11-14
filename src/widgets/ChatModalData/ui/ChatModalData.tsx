import { useState } from 'react'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { ChatMessages } from './ChatMessages'
import { ExportChatButton } from './ExportChatButton'

import { getData } from '../model/helpers'
import { ChatModalDataProps } from '../model/types'

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

const mockChatById: ChatById = {
  id: '1',
  user_id: 'user-123',
  channel: 'telegram',
  current_intent: 'booking',
  previous_intent: 'greeting',
  is_closed: false,
  created_at: '2025-01-14T12:00:00.000Z',
  updated_at: '2025-01-14T12:30:00.000Z',
}

export const ChatModalData = ({ chatId }: ChatModalDataProps) => {
  // chatId will be used when connecting to API
  void chatId
  const [isLoading] = useState(false)
  const [chatById] = useState<ChatById | null>(mockChatById)

  if (isLoading || !chatById) {
    return (
      <Box
        sx={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <DataGrid dense data={getData(chatById)} />

      <ChatMessages />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          gridColumn: '2',
        }}
      >
        <Button variant="contained">Intercept/Return</Button>
        <Button variant="contained">Message</Button>
        <ExportChatButton chatId={chatById.id} />
        <Button variant="contained">Close chat</Button>
      </Box>
    </Box>
  )
}
