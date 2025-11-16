import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import { appointmentsSelector } from '@entities/appointments'
import {
  deleteAppointmentApi,
  getAppointmentsApi,
} from '@entities/appointments/api'

import { CreateAppointmentForm } from '@features/forms/CreateAppointmentForm'

import { AppointmentModalData } from '@widgets/AppointmentModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const AppointmentsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, appointments } = useAppSelector(appointmentsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getAppointmentsApi())
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

    dispatch(deleteAppointmentApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Appointment deleted')
        dispatch(getAppointmentsApi())
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
        rows={appointments}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing an appointment"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the appointment with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-appointment-form"
        open={editIsOpen}
        title="Editing an appointment"
        onClose={handleClose}
      >
        <CreateAppointmentForm appointmentId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-appointment-form"
        open={viewIsOpen}
        title="Appointment"
        onClose={handleClose}
      >
        {id && <AppointmentModalData appointmentId={id as string} />}
      </Modal>
    </>
  )
}
