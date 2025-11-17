import { useEffect, useState } from 'react'

import { filialByIdSelector, getFilialByIdApi } from '@entities/filials'

import { ClinicModalData } from '@widgets/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { EmployeesData } from './EmployeesData'
import { FavoursData } from './FavoursData'

import { getData } from '../model/helpers'
import { AffiliateModalDataProps } from '../model/types'

export const AffiliateModalData = ({ filialId }: AffiliateModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)

  const { status, filialById } = useAppSelector(filialByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFilialByIdApi(filialId))
  }, [dispatch, filialId])

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  if (!filialById || status === 'pending') {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <DataGrid dense data={getData(filialById, handleClinicClick)} />

      <EmployeesData filialId={filialId} />

      <FavoursData filialId={filialId} />

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {filialById.clinic_id && (
          <ClinicModalData clinicId={filialById.clinic_id} />
        )}
      </Modal>
    </Box>
  )
}
