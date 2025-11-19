import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  editEmployeeScheduleApi,
  employeeScheduleByIdSelector,
  getEmployeeScheduleApi,
  getEmployeeScheduleByIdApi,
} from '@entities/employee_schedules'

import { ScheduleStep } from '@features/forms/CreateEmployeeScheduleForm/ui/ScheduleStep'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { createDefaultWorkTime, normalizeWorkTime } from '../model/helpers'
import {
  EditEmployeeScheduleFormProps,
  EditEmployeeScheduleFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditEmployeeScheduleForm = ({
  scheduleId,
  onClose,
}: EditEmployeeScheduleFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, employeeScheduleById } = useAppSelector(
    employeeScheduleByIdSelector
  )

  const form = useForm<EditEmployeeScheduleFormValues>({
    defaultValues: {
      work_time: createDefaultWorkTime(),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver<EditEmployeeScheduleFormValues>(validationSchema()),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (scheduleId) {
      dispatch(getEmployeeScheduleByIdApi(scheduleId))
    }
  }, [dispatch, scheduleId])

  useEffect(() => {
    if (employeeScheduleById) {
      reset({
        work_time: normalizeWorkTime(
          employeeScheduleById.work_time ?? employeeScheduleById.work_time_table
        ),
      })
    }
  }, [employeeScheduleById, reset])

  const onSubmit = (data: EditEmployeeScheduleFormValues) => {
    setIsLoading(true)

    dispatch(
      editEmployeeScheduleApi({
        schedule_id: scheduleId,
        work_time: normalizeWorkTime(data.work_time),
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Employee schedule successfully edited')
        onClose()
        dispatch(getEmployeeScheduleApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if (status === 'pending' || !employeeScheduleById) {
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
      <form id="edit-employee-schedule-form" onSubmit={handleSubmit(onSubmit)}>
        <ScheduleStep />

        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
