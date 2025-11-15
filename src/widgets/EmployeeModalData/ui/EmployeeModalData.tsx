import { useEffect, useState } from 'react'

import { employeeByIdSelector, getEmployeeByIdApi } from '@entities/employees'

import { ClinicModalData } from '@widgets/ClinicModalData'
import { FavourModalData } from '@widgets/FavourModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { EmployeeModalDataProps } from '../model/types'

export const EmployeeModalData = ({ employeeId }: EmployeeModalDataProps) => {
  const [openedModal, setOpenedModal] = useState<null | {
    type: 'clinic' | 'favours'
    id: string
  }>(null)

  const { status, employeeById } = useAppSelector(employeeByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEmployeeByIdApi(employeeId))
  }, [employeeId, dispatch])

  if (!employeeById || status === 'pending') {
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

  const openModal = (type: 'clinic' | 'favours', id: string) => {
    setOpenedModal({ type, id })
  }

  const closeModal = () => setOpenedModal(null)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(employeeById, openModal)}
          subtitleMaxWidth="350px"
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={Boolean(openedModal)}
        title={openedModal?.type}
        onClose={closeModal}
      >
        {openedModal?.type === 'clinic' && (
          <ClinicModalData clinicId={openedModal.id} />
        )}

        {openedModal?.type === 'favours' && (
          <FavourModalData favourId={openedModal.id} />
        )}
      </Modal>
    </>
  )
}
