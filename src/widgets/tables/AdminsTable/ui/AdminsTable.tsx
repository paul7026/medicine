import { useEffect, useState } from 'react'

import {
  Admin,
  adminsSelector,
  deleteAdminApi,
  getAdminsApi,
} from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { EditAdminForm } from './EditAdminForm'

import { getColumns } from '../model/getColumns'

export const AdminsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [admin, setAdmin] = useState<Admin | null>(null)

  const { admins, status } = useAppSelector(adminsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getAdminsApi())
  }, [dispatch])

  const handleClickDelete = (admin: Admin) => {
    setAdmin(admin)
    setDeleteIsOpen(true)
  }

  const handleEdit = (admin: Admin) => {
    setAdmin(admin)
    setEditIsOpen(true)
  }

  const handleClose = () => {
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setAdmin(null)
  }

  const handleDelete = () => {
    if (!admin) {
      return
    }

    dispatch(deleteAdminApi(admin.id))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Admin deleted')
        dispatch(getAdminsApi())
      })
      .catch((err) => addErrorMessage(err))
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
          <strong>{admin?.id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-admin-form"
        open={editIsOpen}
        title="Editing an admin"
        onClose={handleClose}
      >
        {admin && <EditAdminForm admin={admin} onClose={handleClose} />}
      </Modal>
    </>
  )
}
