import { useEffect, useState } from 'react'

import { Prompt, getPromptsApi, promptsSelector } from '@entities/prompts'

import { PromptModalData } from '@widgets/PromptModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

export const PromptsTable = () => {
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [prompt, setPrompt] = useState<Prompt | null>(null)

  const { status, prompts } = useAppSelector(promptsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPromptsApi())
  }, [dispatch])

  const handleClose = () => {
    setViewIsOpen(false)
  }

  const handleView = (prompt: Prompt) => {
    setPrompt(prompt)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleView)}
        loading={status === 'pending'}
        rows={prompts}
      />

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="md"
        open={viewIsOpen}
        title={prompt?.prettify_name}
        onClose={handleClose}
      >
        {prompt && <PromptModalData promptId={prompt.id} />}
      </Modal>
    </>
  )
}
