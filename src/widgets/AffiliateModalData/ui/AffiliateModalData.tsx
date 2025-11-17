import { useEffect, useState } from 'react'

import { filialByIdSelector, getFilialByIdApi } from '@entities/filials'

import { EditFilialToEmployeeForm } from '@features/forms/EditFilialToEmployeeForm'
import { EditFilialToFavoursForm } from '@features/forms/EditFilialToFavoursForm'

import { ClinicModalData } from '@widgets/ClinicModalData'
import { EmployeeModalData } from '@widgets/EmployeeModalData'
import { FilialEmployeesTable } from '@widgets/tables/FilialEmployeesTable'
import { FilialFavoursTable } from '@widgets/tables/FilialFavoursTable'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'
import { Modal } from '@shared/ui/Modal'
import { Typography } from '@shared/ui/Typography'

import { getData } from '../model/helpers'
import { AffiliateModalDataProps } from '../model/types'

export const AffiliateModalData = ({ filialId }: AffiliateModalDataProps) => {
  const [clinicModalOpen, setClinicModalOpen] = useState(false)
  const [employeesModalOpen, setEmployeesModalOpen] = useState(false)
  const [favoursModalOpen, setFavoursModalOpen] = useState(false)
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  )
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

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
          <Typography variant="h6">Employees</Typography>
          <Button
            variant="contained"
            onClick={() => setEmployeesModalOpen(true)}
          >
            Edit employees
          </Button>
        </Box>

        <FilialEmployeesTable
          filialId={filialId}
          onNameClick={(employeeId) => {
            setSelectedEmployeeId(employeeId)
            setEmployeeModalOpen(true)
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'space-between' }}>
          <Typography variant="h6">Favours</Typography>
          <Button variant="contained" onClick={() => setFavoursModalOpen(true)}>
            Edit favours
          </Button>
        </Box>

        <FilialFavoursTable filialId={filialId} />
      </Box>

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

      <Modal
        formId="edit-filial-to-employee-form"
        maxWidth="md"
        open={employeesModalOpen}
        title="Edit employees"
        onClose={() => setEmployeesModalOpen(false)}
      >
        <EditFilialToEmployeeForm
          filialId={filialId}
          onClose={() => setEmployeesModalOpen(false)}
        />
      </Modal>

      <Modal
        withoutActionButtons
        maxWidth="md"
        open={employeeModalOpen}
        title="Employee"
        onClose={() => {
          setEmployeeModalOpen(false)
          setSelectedEmployeeId(null)
        }}
      >
        {selectedEmployeeId && (
          <EmployeeModalData employeeId={selectedEmployeeId} />
        )}
      </Modal>

      <Modal
        formId="edit-filial-to-favours-form"
        maxWidth="md"
        open={favoursModalOpen}
        title="Edit favours"
        onClose={() => setFavoursModalOpen(false)}
      >
        <EditFilialToFavoursForm
          filialId={filialId}
          onClose={() => setFavoursModalOpen(false)}
        />
      </Modal>

      {/* <Modal
        withoutActionButtons
        maxWidth="md"
        open={favoursModalOpen}
        title="Favour"
        onClose={() => setFavoursModalOpen(false)}
      >
        {selectedFavourId && <FavourModalData favourId={selectedFavourId} />}
      </Modal> */}
    </Box>
  )
}
