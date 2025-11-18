import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  allEmployeesForFormSelector,
  getAllEmployeesForFormApi,
} from '@entities/employees'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { Box } from '@shared/ui/Box'

export const Fields = () => {
  const { allEmployeesForForm, status } = useAppSelector(
    allEmployeesForFormSelector
  )

  const isEmptyEmployees = allEmployeesForForm.length === 0

  const form = useFormContext()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllEmployeesForFormApi())
  }, [dispatch])

  const options = allEmployeesForForm.map((employee) => ({
    id: employee.id,
    label: employee.id,
  }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AutocompleteControl
        multiple
        disabled={isEmptyEmployees || status === 'pending'}
        form={form}
        label={isEmptyEmployees ? 'No employees found' : 'Employees'}
        limitTags={4}
        loading={status === 'pending'}
        name="employees"
        options={options}
      />
    </Box>
  )
}
