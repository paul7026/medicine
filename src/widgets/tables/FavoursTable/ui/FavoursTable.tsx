import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteFavourApi,
  favoursSelector,
  getFavoursApi,
} from '@entities/favours'

import { CreateFavourForm } from '@features/forms/CreateFavourForm'

import { FavourModalData } from '@widgets/FavourModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const FavoursTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, favours } = useAppSelector(favoursSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getFavoursApi())
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

    dispatch(deleteFavourApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Favour deleted')
        dispatch(getFavoursApi())
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
        rows={favours}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a favour"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the favour with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-favour-form"
        open={editIsOpen}
        title="Editing an favour"
        onClose={handleClose}
      >
        <CreateFavourForm favourId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-favour-form"
        maxWidth="md"
        open={viewIsOpen}
        title="Favour"
        onClose={handleClose}
      >
        {id && <FavourModalData favourId={id as string} />}
      </Modal>
    </>
  )
}
