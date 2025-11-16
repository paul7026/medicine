import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  getEmployeesApi,
  getSelectedEmployeesForFormApi,
  selectedEmployeesForFormSelector,
} from '@entities/employees'
import { getFilialByIdApi, postFilialToEmployeeApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  EditFilialToEmployeeFormProps,
  EditFilialToEmployeeFormValues,
} from '../model/types'

export const EditFilialToEmployeeForm = ({
  filialId,
  onClose,
}: EditFilialToEmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { selectedEmployeesForForm } = useAppSelector(
    selectedEmployeesForFormSelector
  )

  const form = useForm<EditFilialToEmployeeFormValues>({
    defaultValues: {
      employees: [],
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!filialId) return

    dispatch(getSelectedEmployeesForFormApi(`filial_id=${filialId}`))
  }, [dispatch, filialId])

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

  const onSubmit = ({ employees }: EditFilialToEmployeeFormValues) => {
    setIsLoading(true)

    dispatch(
      postFilialToEmployeeApi({
        filial_id: filialId,
        employees,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Employees updated for filial')
        onClose()
        dispatch(getFilialByIdApi(filialId))
        dispatch(getEmployeesApi(`filial_id=${filialId}`))
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="edit-filial-to-employee-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
