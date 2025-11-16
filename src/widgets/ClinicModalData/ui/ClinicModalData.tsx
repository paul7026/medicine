import { useEffect, useState } from 'react'

import { clinicByIdSelector, getClinicByIdApi } from '@entities/clinics'

import { CreateScheduleConnectionForm } from '@features/ScheduleConnectionsActions'
import { UploadDocumentForm } from '@features/UploadDocumentForm'
import { CreateChatbotForm } from '@features/forms/CreateChatbotForm'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { ClinicModalDataProps } from '../model/types'

export const ClinicModalData = ({ clinicId }: ClinicModalDataProps) => {
  const [isCreateConnectionOpen, setIsCreateConnectionOpen] = useState(false)
  const [isUploadDocumentOpen, setIsUploadDocumentOpen] = useState(false)
  const [isCreateChatbotOpen, setIsCreateChatbotOpen] = useState(false)

  const { status, clinicById } = useAppSelector(clinicByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicByIdApi(clinicId))
  }, [clinicId, dispatch])

  if (!clinicById || status === 'pending') {
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid dense data={getData(clinicById)} subtitleMaxWidth="350px" />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            onClick={() => setIsUploadDocumentOpen(true)}
          >
            Load document
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsCreateChatbotOpen(true)}
          >
            Add chatbot connection
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsCreateConnectionOpen(true)}
          >
            Add schedule connection
          </Button>
        </Box>
      </Box>

      <Modal
        formId="create-form"
        maxWidth="sm"
        open={isCreateConnectionOpen}
        title="Add schedule connection"
        onClose={() => setIsCreateConnectionOpen(false)}
      >
        <CreateScheduleConnectionForm
          onClose={() => setIsCreateConnectionOpen(false)}
        />
      </Modal>

      <Modal
        formId="upload-document-form"
        maxWidth="sm"
        open={isUploadDocumentOpen}
        title="Upload new document"
        onClose={() => setIsUploadDocumentOpen(false)}
      >
        <UploadDocumentForm onClose={() => setIsUploadDocumentOpen(false)} />
      </Modal>

      <Modal
        formId="create-chatbot-form"
        maxWidth="sm"
        open={isCreateChatbotOpen}
        title="Create new chatbot"
        onClose={() => setIsCreateChatbotOpen(false)}
      >
        <CreateChatbotForm onClose={() => setIsCreateChatbotOpen(false)} />
      </Modal>
    </>
  )
}
