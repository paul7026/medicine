import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  getEmployeesApi,
  getSelectedEmployeesForFormApi,
  selectedEmployeesForFormSelector,
} from '@entities/employees'
import { favourToEmployeeApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import {
  EditFavourToEmployeeFormProps,
  EditFavourToEmployeeFormValues,
} from '../model/types'
import { Fields } from './Fields'

export const EditFavourToEmployeeForm = ({
  favourId,
  onClose,
}: EditFavourToEmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { selectedEmployeesForForm } = useAppSelector(
    selectedEmployeesForFormSelector
  )

  const form = useForm<EditFavourToEmployeeFormValues>({
    defaultValues: {
      employees: [],
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!favourId) return

    dispatch(getSelectedEmployeesForFormApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  // Pre-fill employees from selectedEmployeesForForm
  useEffect(() => {
    if (selectedEmployeesForForm && selectedEmployeesForForm.length > 0) {
      reset({
        employees: selectedEmployeesForForm.map((employee) => employee.id),
      })
    } else {
      reset({ employees: [] })
    }
  }, [reset, selectedEmployeesForForm])

  const onSubmit = ({ employees }: EditFavourToEmployeeFormValues) => {
    setIsLoading(true)

    dispatch(
      favourToEmployeeApi({
        favour_id: favourId,
        employees,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Employees updated for favour')
        onClose()
        dispatch(getEmployeesApi(`favour_id=${favourId}`))
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="edit-favour-to-employee-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
