import { GridRowId } from '@mui/x-data-grid'

import { useState } from 'react'

import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { EditUserForm } from './EditUserForm'

import { getColumns } from '../model/getColumns'

export const UsersTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
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
    setViewIsOpen(false)
    setId(null)
  }

  const handleDelete = () => {
    handleClose()
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
        rows={[
          {
            id: '5555djdfdf-fdfsdfsf',
            tenant: 'PANACEA',
            clinic_id: '',
            name: 'Jack',
            is_active: true,
          },
          {
            id: '1111djdfdf-fdfsdfsf',
            tenant: 'CLINIC',
            clinic_id: '1111djdfdf-hjghdghf-4144454d',
            name: 'Logan',
            is_active: true,
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
        title="Removing a user"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the user with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a user"
        onClose={handleClose}
      >
        <EditUserForm onClose={handleClose} />
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
