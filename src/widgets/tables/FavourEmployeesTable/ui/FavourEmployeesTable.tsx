import { useEffect, useState } from 'react'

import { employeesSelector, getEmployeesApi } from '@entities/employees'

import { EmployeeModalData } from '@widgets/EmployeeModalData'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Modal } from '@shared/ui/Modal'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

interface FavourEmployeesTableProps {
  favourId: string
}

export const FavourEmployeesTable = ({ favourId }: FavourEmployeesTableProps) => {
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null
  )

  const { employees, status } = useAppSelector(employeesSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEmployeesApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  const handleNameClick = (id: string) => {
    setSelectedEmployeeId(id)
    setEmployeeModalOpen(true)
  }

  return (
    <>
      <Box sx={{ height: 300 }}>
        <Table
          hideFooter
          isSingleSelection
          columns={getColumns(handleNameClick)}
          loading={status === 'pending'}
          rows={employees}
        />
      </Box>

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
    </>
  )
}
