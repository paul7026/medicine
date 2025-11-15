import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  deleteScheduleConnectionApi,
  getScheduleConnectionsApi,
  scheduleConnectionsSelector,
} from '@entities/schedule_connections'

import { ScheduleConnectionModalData } from '@widgets/ScheduleConnectionModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { EditScheduleConnectionForm } from './EditScheduleConnectionForm'

import { getColumns } from '../model/getColumns'

export const ScheduleConnectionsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, scheduleConnections } = useAppSelector(
    scheduleConnectionsSelector
  )

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getScheduleConnectionsApi())
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

    dispatch(deleteScheduleConnectionApi(String(id)))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Schedule connection deleted')
        dispatch(getScheduleConnectionsApi())
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
        rows={scheduleConnections}
      />
      <Modal
        okButton={
          <Button color="error" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        }
        open={deleteIsOpen}
        title="Removing a schedule connection"
        onClose={handleClose}
      >
        <Typography>
          Are you sure you want to delete the schedule connection with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a schedule connection"
        onClose={handleClose}
      >
        {id && (
          <EditScheduleConnectionForm
            connectionId={String(id)}
            onClose={handleClose}
          />
        )}
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="md"
        open={viewIsOpen}
        title="Schedule connection"
        onClose={handleClose}
      >
        {id && <ScheduleConnectionModalData connectionId={String(id)} />}
      </Modal>
    </>
  )
}
