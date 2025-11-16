import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  createEmployeeApi,
  editEmployeeApi,
  employeeByIdSelector,
  getEmployeeByIdApi,
  getEmployeesApi,
} from '@entities/employees'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  CreateEmployeeFormProps,
  CreateEmployeeFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateEmployeeForm = ({
  employeeId,
  onClose,
}: CreateEmployeeFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, employeeById } = useAppSelector(employeeByIdSelector)

  const tenant = getTenantType()

  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateEmployeeFormValues>({
    defaultValues: {
      name: '',
      gender: '',
      email: '',
      phone: '',
      position: '',
      specialization: '',
      work_experience: 0,
      medical_degree: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer, employeeId)),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (employeeId) {
      dispatch(getEmployeeByIdApi(employeeId as string))
    }
  }, [employeeId, dispatch])

  useEffect(() => {
    if (employeeById && employeeId) {
      reset({
        name: employeeById.name,
        gender: employeeById.gender,
        email: employeeById.email,
        phone: employeeById.phone,
        position: employeeById.position,
        specialization: employeeById.specialization,
        work_experience: employeeById.work_experience,
        medical_degree: employeeById.medical_degree,
        clinic_id: employeeById.clinic_id,
      })
    }
  }, [employeeById, employeeId, reset])

  const onSubmit = ({ clinic_id, ...rest }: CreateEmployeeFormValues) => {
    setIsLoading(true)

    if (employeeId) {
      dispatch(
        editEmployeeApi({
          employee_id: employeeId as string,
          ...(isMaintainer && !employeeId && { clinic_id }),
          ...rest,
        })
      )
        .unwrap()
        .then(() => {
          addSuccessMessage('Employee successfully edited')
          onClose()
          dispatch(getEmployeesApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }

    dispatch(createEmployeeApi({ ...(isMaintainer && { clinic_id }), ...rest }))
      .unwrap()
      .then(() => {
        addSuccessMessage('Employee successfully created')
        onClose()
        dispatch(getEmployeesApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if ((status === 'pending' || !employeeById) && employeeId) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <FormProvider {...form}>
      <form
        id={employeeId ? 'edit-employee-form' : 'create-employee-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields employeeId={employeeId} isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
