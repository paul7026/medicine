import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  createEmployeeScheduleApi,
  getEmployeeScheduleApi,
} from '@entities/employee_schedules'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'
import { Stepper } from '@shared/ui/Stepper'

import { Fields } from './Fields'
import { ScheduleStep } from './ScheduleStep'

import {
  CreateEmployeeScheduleFormProps,
  CreateEmployeeScheduleFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

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

export const CreateEmployeeScheduleForm = ({
  onClose,
}: CreateEmployeeScheduleFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  const form = useForm<CreateEmployeeScheduleFormValues>({
    defaultValues: {
      clinic: '',
      employee: '',
      filial: '',
      work_time: createDefaultWorkTime(),
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = (data: CreateEmployeeScheduleFormValues) => {
    setIsLoading(true)

    dispatch(createEmployeeScheduleApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Employee schedule successfully created')
        onClose()
        dispatch(getEmployeeScheduleApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  const steps = ['Basic Information', 'Schedule']

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
          {activeStep === 0 && <Fields />}
          {activeStep === 1 && <ScheduleStep />}
        </Box>
      </Stepper>

      <LoadingBackdrop isLoading={isLoading} />
    </>
  )
}
