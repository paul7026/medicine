import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteEmployeeScheduleApi,
  employeeSchedulesSelector,
  getEmployeeScheduleApi,
} from '@entities/employee_schedules'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const EmployeeScheduleTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, employeeSchedules } = useAppSelector(
    employeeSchedulesSelector
  )

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getEmployeeScheduleApi())
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

    dispatch(deleteEmployeeScheduleApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Employee schedule deleted')
        dispatch(getEmployeeScheduleApi())
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
        rows={employeeSchedules}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing an employee schedule"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the employee schedule with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-employee-schedule-form"
        open={editIsOpen}
        title="Editing an employee schedule"
        onClose={handleClose}
      >
        {/* Edit form will be added here */}
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-employee-schedule-form"
        maxWidth="md"
        open={viewIsOpen}
        title="Employee Schedule"
        onClose={handleClose}
      >
        {/* View modal data will be added here */}
      </Modal>
    </>
  )
}
