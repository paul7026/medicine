import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteEmployeeApi,
  employeesSelector,
  getEmployeesApi,
} from '@entities/employees'

import { CreateEmployeeForm } from '@features/forms/CreateEmployeeForm'

import { EmployeeModalData } from '@widgets/EmployeeModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const EmployeesTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, employees } = useAppSelector(employeesSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getEmployeesApi())
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

    dispatch(deleteEmployeeApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Employee deleted')
        dispatch(getEmployeesApi())
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
        rows={employees}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a employee"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the employee with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-employee-form"
        open={editIsOpen}
        title="Editing an employee"
        onClose={handleClose}
      >
        <CreateEmployeeForm employeeId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-employee-form"
        open={viewIsOpen}
        title="Employee"
        onClose={handleClose}
      >
        {id && <EmployeeModalData employeeId={id as string} />}
      </Modal>
    </>
  )
}
