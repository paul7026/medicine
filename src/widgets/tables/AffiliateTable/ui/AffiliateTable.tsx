import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteFilialApi,
  filialsSelector,
  getFilialsApi,
} from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { EditFilialForm } from './EditFilialForm'

import { getColumns } from '../model/getColumns'

export const AffiliateTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, filials } = useAppSelector(filialsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getFilialsApi())
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

    dispatch(deleteFilialApi(String(id)))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Filial deleted')
        dispatch(getFilialsApi())
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
        rows={filials}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a filial"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the filial with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a filial"
        onClose={handleClose}
      >
        {id && <EditFilialForm filialId={String(id)} onClose={handleClose} />}
      </Modal>

      <Modal
        formId="view-form"
        open={viewIsOpen}
        title="User"
        onClose={handleClose}
      >
        {/* <EditUserForm onClose={handleClose} /> */}
      </Modal>
    </>
  )
}
