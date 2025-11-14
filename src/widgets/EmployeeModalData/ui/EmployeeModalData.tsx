import { useEffect } from 'react'

import { employeeByIdSelector, getEmployeeByIdApi } from '@entities/employees'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { EmployeeModalDataProps } from '../model/types'

export const EmployeeModalData = ({ employeeId }: EmployeeModalDataProps) => {
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid dense data={getData(employeeById)} subtitleMaxWidth="350px" />
    </Box>
  )
}
