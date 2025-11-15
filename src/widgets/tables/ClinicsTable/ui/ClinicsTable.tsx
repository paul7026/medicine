import { GridRowId } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import {
  clinicsSelector,
  deleteClinicApi,
  getClinicsApi,
} from '@entities/clinics'

import { CreateClinicForm } from '@features/forms/CreateClinicForm'

import { ClinicModalData } from '@widgets/ClinicModalData/ui/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Button } from '@shared/ui/Button'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'
import { Typography } from '@shared/ui/Typography'

import { getColumns } from '../model/getColumns'

export const ClinicsTable = () => {
  const [deleteIsOpen, setDeleteIsOpen] = useState(false)
  const [editIsOpen, setEditIsOpen] = useState(false)
  const [viewIsOpen, setViewIsOpen] = useState(false)
  const [id, setId] = useState<GridRowId | null>(null)

  const { status, clinics } = useAppSelector(clinicsSelector)

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getClinicsApi())
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

    dispatch(deleteClinicApi(id as string))
      .unwrap()
      .then(() => {
        handleClose()
        addSuccessMessage('Clinic deleted')
        dispatch(getClinicsApi())
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
        rows={clinics}
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
          Are you sure you want to delete the clinic with id:{' '}
          <strong>{id}</strong>?
        </Typography>
      </Modal>

      <Modal
        formId="edit-form"
        open={editIsOpen}
        title="Editing a clinic"
        onClose={handleClose}
      >
        <CreateClinicForm clinicId={id} onClose={handleClose} />
      </Modal>

      <Modal
        withoutActionButtons
        formId="view-form"
        maxWidth="md"
        open={viewIsOpen}
        title="Clinic"
        onClose={handleClose}
      >
        {id && <ClinicModalData clinicId={id as string} />}
      </Modal>
    </>
  )
}
