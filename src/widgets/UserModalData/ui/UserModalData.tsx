import { useEffect, useState } from 'react'

import { getUserByIdApi, userByIdSelector } from '@entities/users'

import { ClinicModalData } from '@widgets/ClinicModalData'
import { ContraindicationsModalData } from '@widgets/ContraindicationsModalData'
import { LifestyleModalData } from '@widgets/LifestyleModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getData } from '../model/helpers'
import { UserModalDataProps } from '../model/types'

export const UserModalData = ({ userId }: UserModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)
  const [lifestyleModalOpen, setLifestyleModalOpen] = useState(false)
  const [contraindicationsModalOpen, setContraindicationsModalOpen] =
    useState(false)

  const { status, userById } = useAppSelector(userByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserByIdApi(userId))
  }, [dispatch, userId])

  const handleClinicClick = () => {
    setClinicModalOpen(true)
  }

  const handleCloseClinicModal = () => {
    setClinicModalOpen(false)
  }

  const handleLifestyleClick = () => {
    setLifestyleModalOpen(true)
  }

  const handleCloseLifestyleModal = () => {
    setLifestyleModalOpen(false)
  }

  const handleContraindicationsClick = () => {
    setContraindicationsModalOpen(true)
  }

  const handleCloseContraindicationsModal = () => {
    setContraindicationsModalOpen(false)
  }

  if (!userById || status === 'pending') {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid
        dense
        data={getData(
          userById,
          handleClinicClick,
          handleLifestyleClick,
          handleContraindicationsClick
        )}
      />
      <Modal
        withoutActionButtons
        maxWidth="md"
        open={clinicModalOpen}
        title="Clinic"
        onClose={handleCloseClinicModal}
      >
        {userById.clinic_id && (
          <ClinicModalData clinicId={userById.clinic_id} />
        )}
      </Modal>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={lifestyleModalOpen}
        title="Lifestyle"
        onClose={handleCloseLifestyleModal}
      >
        <LifestyleModalData lifestyle={userById.lifestyle} />
      </Modal>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={contraindicationsModalOpen}
        title="Contraindications"
        onClose={handleCloseContraindicationsModal}
      >
        <ContraindicationsModalData
          contraindications={userById.contraindications}
        />
      </Modal>
    </Box>
  )
}
