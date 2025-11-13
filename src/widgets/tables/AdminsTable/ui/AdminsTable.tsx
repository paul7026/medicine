import { GridRowId } from '@mui/x-data-grid'

import { useState } from 'react'

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
        rows={[
          {
            id: '5555djdfdf-fdfsdfsf',
            tenant: 'PANACEA',
            clinic_id: '',
            username: 'Jack',
            is_superuser: true,
            is_active: true,
            deleted_at: '',
          },
          {
            id: '1111djdfdf-fdfsdfsf',
            tenant: 'CLINIC',
            clinic_id: '1111djdfdf-hjghdghf-4144454d',
            username: 'Logan',
            is_superuser: false,
            is_active: true,
            deleted_at: '',
          },
        ]}
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
        title="Editing a user"
        onClose={handleClose}
      >
        <EditAdminForm onClose={handleClose} />
      </Modal>
    </>
  )
}
