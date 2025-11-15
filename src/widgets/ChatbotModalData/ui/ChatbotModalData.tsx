import { useEffect, useState } from 'react'

import { chatbotByIdSelector, getChatbotByIdApi } from '@entities/chatbots'

import { ClinicModalData } from '@widgets/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { ChatbotModalDataProps } from '../model/types'

export const ChatbotModalData = ({ chatbotId }: ChatbotModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)

  const { chatbotById, status } = useAppSelector(chatbotByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getChatbotByIdApi(chatbotId))
  }, [chatbotId, dispatch])

  if (!chatbotById || status === 'pending') {
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

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(chatbotById, handleClinicClick)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {chatbotById.clinic_id && (
          <ClinicModalData clinicId={chatbotById.clinic_id} />
        )}
      </Modal>
    </>
  )
}
