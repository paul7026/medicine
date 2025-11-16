import { useEffect } from 'react'

import { employeesSelector, getEmployeesApi } from '@entities/employees'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

interface FilialEmployeesTableProps {
  filialId: string
  onNameClick: (employeeId: string) => void
}

export const FilialEmployeesTable = ({
  filialId,
  onNameClick,
}: FilialEmployeesTableProps) => {
  const { employees, status } = useAppSelector(employeesSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!filialId) return
    dispatch(getEmployeesApi(`filial_id=${filialId}`))
  }, [dispatch, filialId])

  const columns = getColumns((id: string) => {
    onNameClick(id)
  })

  return (
    <Box sx={{ height: 300 }}>
      <Table
        hideFooter
        isSingleSelection
        columns={columns}
        loading={status === 'pending'}
        rows={employees}
      />
    </Box>
  )
}
