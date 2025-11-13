import { useEffect, useState } from 'react'

import {
  User,
  deleteUserApi,
  getUsersApi,
  usersSelector,
} from '@entities/users'

import { UserModalData } from '@widgets/UserModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
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
  const [user, setUser] = useState<User | null>(null)

  const { status, users } = useAppSelector(usersSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getUsersApi())
  }, [dispatch])

  const handleClickDelete = (user: User) => {
    setUser(user)
    setDeleteIsOpen(true)
  }

  const handleEdit = (user: User) => {
    setUser(user)
    setEditIsOpen(true)
  }

  const handleClose = () => {
    setDeleteIsOpen(false)
    setEditIsOpen(false)
    setViewIsOpen(false)
  }

  const handleDelete = () => {
    if (!user) {
      return
    }

    dispatch(deleteUserApi(user.id))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('User deleted')
        dispatch(getUsersApi())
      })
      .catch((err) => addErrorMessage(err))
  }

  const handleView = (user: User) => {
    setUser(user)
    setViewIsOpen(true)
  }

  return (
    <>
      <Table
        isSingleSelection
        columns={getColumns(handleClickDelete, handleEdit, handleView)}
        loading={status === 'pending'}
        rows={users}
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
          Are you sure you want to delete the user:{' '}
          <strong>{user?.name}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a user"
        onClose={handleClose}
      >
        {user && <EditUserForm userId={user.id} onClose={handleClose} />}
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="md"
        open={viewIsOpen}
        title="User"
        onClose={handleClose}
      >
        {user && <UserModalData userId={user.id} />}
      </Modal>
    </>
  )
}
