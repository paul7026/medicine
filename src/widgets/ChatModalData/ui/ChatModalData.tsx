import { useEffect, useState } from 'react'

import {
  chatByIdSelector,
  closeChatApi,
  getChatByIdApi,
  getChatHistoryApi,
} from '@entities/chats'

import { EditChatsForm } from '@widgets/tables/ChatsTable/ui/EditChatsForm'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { ChatMessages } from './ChatMessages'
import { InterceptReturnButton } from './InterceptReturnButton'

import { getData } from '../model/helpers'
import { ChatModalDataProps } from '../model/types'

export const ChatModalData = ({ chatId, onClose }: ChatModalDataProps) => {
  const { status, chatById } = useAppSelector(chatByIdSelector)
  const [isClosing, setIsClosing] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getChatByIdApi(chatId))
  }, [dispatch, chatId])

  const handleCloseChat = () => {
    setIsClosing(true)

    dispatch(closeChatApi(chatId))
      .unwrap()
      .then(() => {
        addSuccessMessage('Chat closed successfully')
        onClose()
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsClosing(false))
  }

  const handleOpenMessage = () => {
    setMessageModalOpen(true)
  }

  const handleCloseMessage = () => {
    setMessageModalOpen(false)
    dispatch(getChatHistoryApi(chatId))
  }

  if (status === 'pending' || !chatById) {
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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        gridTemplateAreas: '"data messages" "actions actions"',
      }}
    >
      <DataGrid dense data={getData(chatById)} sx={{ gridArea: 'data' }} />

      <ChatMessages chatId={chatId} sx={{ gridArea: 'messages' }} />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'flex-end',
          gridColumn: '2',
          gridArea: 'actions',
        }}
      >
        <InterceptReturnButton
          chatId={chatById.id}
          currentIntent={chatById.current_intent}
        />
        <Button variant="contained" onClick={handleOpenMessage}>
          Message
        </Button>
        {/* <ExportChatButton chatId={chatById.id} /> */}
        <Button
          disabled={isClosing}
          variant="contained"
          onClick={handleCloseChat}
        >
          Close chat
        </Button>
      </Box>

      <Modal
        formId="edit-form"
        open={messageModalOpen}
        title="Add new message"
        onClose={handleCloseMessage}
      >
        <EditChatsForm chatId={chatId} onClose={handleCloseMessage} />
      </Modal>
    </Box>
  )
}
