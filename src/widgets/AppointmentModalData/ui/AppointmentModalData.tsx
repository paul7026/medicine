import { useEffect, useState } from 'react'

import {
  appointmentByIdSelector,
  getAppointmentByIdApi,
} from '@entities/appointments'

import { AffiliateModalData } from '@widgets/AffiliateModalData'
import { ClinicModalData } from '@widgets/ClinicModalData'
import { EmployeeModalData } from '@widgets/EmployeeModalData'
import { FavourModalData } from '@widgets/FavourModalData'
import { UserModalData } from '@widgets/UserModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { AppointmentModalDataProps } from '../model/types'

export const AppointmentModalData = ({
  appointmentId,
}: AppointmentModalDataProps) => {
  const [openedModal, setOpenedModal] = useState<null | {
    type: 'user' | 'clinic' | 'filial' | 'favour' | 'employee'
    id: string
  }>(null)

  const { appointmentById, status } = useAppSelector(appointmentByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAppointmentByIdApi(appointmentId))
  }, [appointmentId, dispatch])

  if (!appointmentById || status === 'pending') {
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

  const openModal = (
    type: 'user' | 'clinic' | 'filial' | 'favour' | 'employee',
    id: string
  ) => {
    setOpenedModal({ type, id })
  }

  const closeLinksModal = () => setOpenedModal(null)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(appointmentById, openModal)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={Boolean(openedModal)}
        title={openedModal?.type}
        onClose={closeLinksModal}
      >
        {openedModal?.type === 'user' && (
          <UserModalData userId={openedModal.id} />
        )}
        {openedModal?.type === 'clinic' && (
          <ClinicModalData clinicId={openedModal.id} />
        )}

        {openedModal?.type === 'filial' && (
          <AffiliateModalData filialId={openedModal.id} />
        )}

        {openedModal?.type === 'favour' && (
          <FavourModalData favourId={openedModal.id} />
        )}

        {openedModal?.type === 'employee' && (
          <EmployeeModalData employeeId={openedModal.id} />
        )}
      </Modal>
    </>
  )
}
