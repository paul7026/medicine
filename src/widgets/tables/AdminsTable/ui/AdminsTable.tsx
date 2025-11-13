import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import { adminsSelector, getAdminsApi } from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { EditAdminForm } from './EditAdminForm'

import { getColumns } from '../model/getColumns'

export const AdminsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { admins, status } = useAppSelector(adminsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAdminsApi())
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
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setId(null)
  }

  const handleDelete = () => {
    handleClose()
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleEdit)}
        loading={status === 'pending'}
        rows={admins}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing an admin"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the admin with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-admin-form"
        open={editIsOpen}
        title="Editing an admin"
        onClose={handleClose}
      >
        <EditAdminForm onClose={handleClose} />
      </Modal>
    </>
  )
}
