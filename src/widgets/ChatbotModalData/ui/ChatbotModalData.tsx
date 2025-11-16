import { useState } from 'react'

import {
  getChatbotStatusApi,
  startChatbotApi,
  stopChatbotApi,
} from '@entities/chatbots'

import { ClinicModalData } from '@widgets/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { ChatbotModalDataProps } from '../model/types'

export const ChatbotModalData = ({ chatbot }: ChatbotModalDataProps) => {
  const [loading, setLoading] = useState(false)
  const [clinicModalOpen, setClinicModalOpen] = useState(false)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  if (!chatbot) {
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

  const { id: chatId } = chatbot

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  const handleCheckStatusChatbot = () => {
    setLoading(true)

    dispatch(getChatbotStatusApi(chatId))
      .unwrap()
      .then((data) => {
        addSuccessMessage(
          `Chatbot status successfully retrieved. Status is: ${data.status}`
        )
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setLoading(false))
  }

  const handleStartChatbot = () => {
    setLoading(true)

    dispatch(startChatbotApi(chatId))
      .unwrap()
      .then(() => {
        addSuccessMessage(`Chatbot status successfully started`)
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setLoading(false))
  }

  const handleStopChatbot = () => {
    setLoading(true)

    dispatch(stopChatbotApi(chatId))
      .unwrap()
      .then(() => {
        addSuccessMessage(`Chatbot status successfully stopped`)
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(chatbot, handleClinicClick)}
          subtitleMaxWidth="350px"
        />

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
            gridColumn: '2',
            gridArea: 'actions',
          }}
        >
          <Button variant="contained" onClick={handleCheckStatusChatbot}>
            Get status
          </Button>
          <Button variant="contained" onClick={handleStartChatbot}>
            Start bot
          </Button>
          <Button variant="contained" onClick={handleStopChatbot}>
            Stop bot
          </Button>
        </Box>
      </Box>

      <LoadingBackdrop isLoading={loading} />

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {chatbot.clinic_id && <ClinicModalData clinicId={chatbot.clinic_id} />}
      </Modal>
    </>
  )
}
