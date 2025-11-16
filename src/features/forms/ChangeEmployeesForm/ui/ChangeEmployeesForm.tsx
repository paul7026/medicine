import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { employeesSelector, getEmployeesApi } from '@entities/employees'
import { getFavourByIdApi } from '@entities/favours'
import { favourToEmployeeApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import {
  ChangeEmployeesFormProps,
  ChangeEmployeesFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const ChangeEmployeesForm = ({
  closeModal,
  favourId,
  employeesDefault,
}: ChangeEmployeesFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { employees, status } = useAppSelector(employeesSelector)

  const form = useForm<ChangeEmployeesFormValues>({
    defaultValues: {
      employees: employeesDefault,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form

  const autocompleteOptions = employees.map((employee) => ({
    id: employee.id,
    label: employee.name,
  }))

  const { addSuccessMessage, addErrorMessage } = useSystemMessage()
  const dispatch = useAppDispatch()

  const onSubmit = (data: ChangeEmployeesFormValues) => {
    setIsLoading(true)

    dispatch(favourToEmployeeApi({ favour_id: favourId, ...data }))
      .unwrap()
      .then(() => {
        closeModal()
        reset()
        dispatch(getFavourByIdApi(favourId))
        addSuccessMessage('Employees changed')
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    dispatch(getEmployeesApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  return (
    <form id="change-employees-form" onSubmit={handleSubmit(onSubmit)}>
      <LoadingBackdrop isLoading={isLoading} />

      <AutocompleteControl
        fullWidth
        multiple
        form={form}
        label="Employees"
        loading={status === 'pending'}
        name="employees"
        options={autocompleteOptions}
      />
    </form>
  )
}
