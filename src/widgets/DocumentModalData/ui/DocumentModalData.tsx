import { useEffect, useState } from 'react'

import { documentByIdSelector, getDocumentByIdApi } from '@entities/documents'

import { ClinicModalData } from '@widgets/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { DocumentModalDataProps } from '../model/types'

export const DocumentModalData = ({ documentId }: DocumentModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)

  const { documentById, status } = useAppSelector(documentByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDocumentByIdApi(documentId))
  }, [documentId, dispatch])

  if (!documentById || status === 'pending') {
    return (
      <Box
        sx={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(documentById, handleClinicClick)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {documentById.clinic_id && (
          <ClinicModalData clinicId={documentById.clinic_id} />
        )}
      </Modal>
    </>
  )
}
