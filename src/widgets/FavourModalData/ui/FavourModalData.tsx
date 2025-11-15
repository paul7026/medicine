import { useEffect, useState } from 'react'

import { favourByIdSelector, getFavourByIdApi } from '@entities/favours'

import { ChangeEmployeesForm } from '@features/forms/ChangeEmployeesForm'
import { ChangeFilialsForm } from '@features/forms/ChangeFilialsForm'

import { ClinicModalData } from '@widgets/ClinicModalData'
import { EmployeeModalData } from '@widgets/EmployeeModalData'
import { FavourCategoriesModalData } from '@widgets/FavourCategoriesModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'

import { getDataModal } from '../model/getDataModal'
import { getData } from '../model/helpers'
import { FavourModalDataProps, FavourModalValues } from '../model/types'

export const FavourModalData = ({ favourId }: FavourModalDataProps) => {
  const [modalValue, setModalValue] = useState<FavourModalValues | null>(null)
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

  const { filials, employees } = favourById

  const closeModal = () => setModalValue(null)

  const onItemClick = (
    type: 'clinic' | 'category' | 'employees',
    id: string
  ) => {
    setOpenedModal({ type, id })
  }

  const dataGrid = getData({ setModalValue, favourById, onItemClick })

  const modalData = getDataModal()

  const closeLinksModal = () => setOpenedModal(null)

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <DataGrid dense data={dataGrid} subtitleMaxWidth="350px" />

        {modalValue && (
          <Modal
            formId={modalData[modalValue].formId}
            open={Boolean(modalValue)}
            title={modalData[modalValue].title}
            onClose={closeModal}
          >
            {modalValue === 'changeFilials' && (
              <ChangeFilialsForm
                closeModal={closeModal}
                favourId={favourId}
                filialsDefault={(filials ?? []).map((f) => f.id)}
              />
            )}
            {modalValue === 'changeEmployees' && (
              <ChangeEmployeesForm
                closeModal={closeModal}
                employeesDefault={(employees ?? []).map((e) => e.id)}
                favourId={favourId}
              />
            )}
          </Modal>
        )}
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

        {openedModal?.type === 'employees' && (
          <EmployeeModalData employeeId={openedModal.id} />
        )}
      </Modal>
    </>
  )
}
