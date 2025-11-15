import { useEffect, useState } from 'react'

import {
  getScheduleConnectionByIdApi,
  scheduleConnectionByIdSelector,
} from '@entities/schedule_connections'

import { ClinicModalData } from '@widgets/ClinicModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { ScheduleConnectionModalDataProps } from '../model/types'

export const ScheduleConnectionModalData = ({
  connectionId,
}: ScheduleConnectionModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)
  const { status, scheduleConnectionById } = useAppSelector(
    scheduleConnectionByIdSelector
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getScheduleConnectionByIdApi(connectionId))
  }, [dispatch, connectionId])

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  if (!scheduleConnectionById || status === 'pending') {
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
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid
          dense
          data={getData(scheduleConnectionById, handleClinicClick)}
        />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {scheduleConnectionById.clinic_id && (
          <ClinicModalData clinicId={scheduleConnectionById.clinic_id} />
        )}
      </Modal>
    </>
  )
}
