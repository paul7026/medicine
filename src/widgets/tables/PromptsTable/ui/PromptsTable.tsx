import { useEffect, useState } from 'react'

import {
  Prompt,
  deletePromptApi,
  getPromptsApi,
  promptsSelector,
} from '@entities/prompts'

import { PromptModalData } from '@widgets/PromptModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const PromptsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  const { status, prompts } = useAppSelector(promptsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getPromptsApi())
  }, [dispatch])

  const handleClickDelete = (prompt: Prompt) => {
    setPrompt(prompt)
    setDeleteIsOpen(true)
  }

  const handleEdit = (prompt: Prompt) => {
    setPrompt(prompt)
    setEditIsOpen(true)
  }

  const handleClose = () => {
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setViewIsOpen(false)
  }

  const handleDelete = () => {
    if (!prompt) {
      return
    }

    dispatch(deletePromptApi(prompt.id))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Prompt deleted')
        dispatch(getPromptsApi())
      })
      .catch((err) => addErrorMessage(err))
  }

  const handleView = (prompt: Prompt) => {
    setPrompt(prompt)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleEdit, handleView)}
        loading={status === 'pending'}
        rows={prompts}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a prompt"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the prompt:{' '}
          <strong>{prompt?.name}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a prompt"
        onClose={handleClose}
      >
        {/* Edit form will be added here */}
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="md"
        open={viewIsOpen}
        title={prompt?.name}
        onClose={handleClose}
      >
        {prompt && <PromptModalData promptId={prompt.id} />}
      </Modal>
    </>
  )
}
