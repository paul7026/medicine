import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteDocumentApi,
  documentsSelector,
  getDocumentsApi,
} from '@entities/documents'

import { DocumentModalData } from '@widgets/DocumentModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const DocumentsTable = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, documents } = useAppSelector(documentsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getDocumentsApi())
  }, [dispatch])

  const handleClickDelete = (id: GridRowId) => {
    setId(id)
    setDeleteIsOpen(true)
  }

  const handleClose = () => {
    setId(null)
    setDeleteIsOpen(false)
    setViewIsOpen(false)
  }

  const handleDelete = () => {
    if (!id) {
      return
    }

    setIsLoading(true)

    dispatch(deleteDocumentApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Document deleted')
        dispatch(getDocumentsApi())
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  const handleView = (id: GridRowId) => {
    setId(id)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleView)}
        loading={status === 'pending'}
        rows={documents}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a document"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the document with id:{' '}
          <strong>{id}</strong>?
        </Typography>
        <LoadingBackdrop isLoading={isLoading} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-document-form"
        open={viewIsOpen}
        title="FavourCategories"
        onClose={handleClose}
      >
        {id && <DocumentModalData documentId={id as string} />}
      </Modal>
    </>
  )
}
