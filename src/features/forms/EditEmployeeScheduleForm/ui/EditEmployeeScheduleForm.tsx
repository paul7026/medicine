import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ScheduleDay,
  editEmployeeScheduleApi,
  employeeScheduleByIdSelector,
  getEmployeeScheduleApi,
  getEmployeeScheduleByIdApi,
} from '@entities/employee_schedules'

import { CreateEmployeeScheduleFormValues } from '@features/forms/CreateEmployeeScheduleForm/model/types'
import { validationSchema } from '@features/forms/CreateEmployeeScheduleForm/model/validationSchema'
import { Fields } from '@features/forms/CreateEmployeeScheduleForm/ui/Fields'
import { ScheduleStep } from '@features/forms/CreateEmployeeScheduleForm/ui/ScheduleStep'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'
import { Stepper } from '@shared/ui/Stepper'

const createDefaultWorkTime =
  (): CreateEmployeeScheduleFormValues['work_time'] => ({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  })

export interface EditEmployeeScheduleFormProps {
  scheduleId: string
  onClose: () => void
}

export const EditEmployeeScheduleForm = ({
  scheduleId,
  onClose,
}: EditEmployeeScheduleFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'
  const { status, employeeScheduleById } = useAppSelector(
    employeeScheduleByIdSelector
  )

  const form = useForm<CreateEmployeeScheduleFormValues>({
    defaultValues: {
      clinic: '',
      employee: '',
      filial: '',
      work_time: createDefaultWorkTime(),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer)),
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
        clinic: employeeScheduleById.clinic_id,
        employee: employeeScheduleById.employee_id,
        filial: employeeScheduleById.filial_id,
        work_time:
          employeeScheduleById.work_time_table || createDefaultWorkTime(),
      })
    }
  }, [employeeScheduleById, reset])

  const onSubmit = (data: CreateEmployeeScheduleFormValues) => {
    setIsLoading(true)

    // Convert form format to API format
    const work_time: Record<string, unknown> = {}
    const days: ScheduleDay[] = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ]

    days.forEach((day) => {
      work_time[day] = data.work_time[day].map((slot) => ({
        from_minutes: slot.from,
        to_minutes: slot.to,
      }))
    })

    dispatch(
      editEmployeeScheduleApi({
        schedule_id: scheduleId,
        work_time,
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

  const steps = ['Basic Information', 'Schedule']

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
    <>
      <Stepper
        activeStep={activeStep}
        form={form}
        setActiveStep={setActiveStep}
        steps={steps}
        submitBtnTitle="SAVE"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box sx={{ mb: 4 }}>
          {activeStep === 0 && <Fields isMaintainer={isMaintainer} />}
          {activeStep === 1 && <ScheduleStep />}
        </Box>
      </Stepper>

      <LoadingBackdrop isLoading={isLoading} />
    </>
  )
}
