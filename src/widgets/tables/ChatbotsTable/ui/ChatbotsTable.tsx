import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  chatbotsSelector,
  deleteChatbotApi,
  getChatbotsApi,
} from '@entities/chatbots'

import { CreateChatbotForm } from '@features/forms/CreateChatbotForm'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'
import { ChatbotModalData } from '@widgets/ChatbotModalData'

export const ChatbotsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, chatbots } = useAppSelector(chatbotsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getChatbotsApi())
  }, [dispatch])

  const handleClickDelete = (id: GridRowId) => {
    setId(id)
    setDeleteIsOpen(true)
  }

  const handleEdit = (id: GridRowId) => {
    setId(id)
    setEditIsOpen(true)
  }

  const handleClose = () => {
    setId(null)
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setViewIsOpen(false)
  }

  const handleDelete = () => {
    if (!id) {
      return
    }

    dispatch(deleteChatbotApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Chatbot deleted')
        dispatch(getChatbotsApi())
      })
      .catch((err) => addErrorMessage(err))
  }

  const handleView = (id: GridRowId) => {
    setId(id)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleEdit, handleView)}
        loading={status === 'pending'}
        rows={chatbots}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a chatbot"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the chatbot with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-chatbot-form"
        open={editIsOpen}
        title="Editing an chatbot"
        onClose={handleClose}
      >
        <CreateChatbotForm chatbotId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-chatbot-form"
        open={viewIsOpen}
        title="Chatbot"
        onClose={handleClose}
      >
        {id && <ChatbotModalData chatbotId={id as string} />}
      </Modal>
    </>
  )
}
