import { useEffect, useState } from 'react'

import { favourByIdSelector, getFavourByIdApi } from '@entities/favours'

import { ClinicModalData } from '@widgets/ClinicModalData'
import { FavourCategoriesModalData } from '@widgets/FavourCategoriesModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { FavourToEmployeesData } from './FavourToEmployeesData'
import { FavourToFilialsData } from './FavourToFilialsData'

import { getData } from '../model/helpers'
import { FavourModalDataProps } from '../model/types'

export const FavourModalData = ({ favourId }: FavourModalDataProps) => {
  const [openedModal, setOpenedModal] = useState<null | {
    type: 'clinic' | 'category' | 'filials' | 'employees'
    id: string
  }>(null)

  const { favourById, status } = useAppSelector(favourByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFavourByIdApi(favourId))
  }, [favourId, dispatch])

  if (!favourById || status === 'pending') {
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

  const onItemClick = (type: 'clinic' | 'category', id: string) => {
    setOpenedModal({ type, id })
  }

  const dataGrid = getData({ favourById, onItemClick })

  const closeLinksModal = () => setOpenedModal(null)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid dense data={dataGrid} subtitleMaxWidth="350px" />

        <FavourToFilialsData favourId={favourId} />

        <FavourToEmployeesData favourId={favourId} />
      </Box>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={Boolean(openedModal)}
        title={openedModal?.type}
        onClose={closeLinksModal}
      >
        {openedModal?.type === 'clinic' && (
          <ClinicModalData clinicId={openedModal.id} />
        )}

        {openedModal?.type === 'category' && (
          <FavourCategoriesModalData categoryId={openedModal.id} />
        )}
      </Modal>
    </>
  )
}
