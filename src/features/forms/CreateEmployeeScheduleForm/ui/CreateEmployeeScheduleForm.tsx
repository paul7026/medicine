import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { whoAmISelector } from '@entities/auth/store/selectors'
import {
  createEmployeeScheduleApi,
  getEmployeeScheduleApi,
} from '@entities/employee_schedules'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
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

  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'
  const { whoAmI } = useAppSelector(whoAmISelector)

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

  const { handleSubmit } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = (data: CreateEmployeeScheduleFormValues) => {
    setIsLoading(true)

    const clinic_id = isMaintainer ? data.clinic : whoAmI?.clinic_id || ''

    dispatch(
      createEmployeeScheduleApi({
        ...data,
        clinic: clinic_id,
      })
    )
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
          {activeStep === 0 && <Fields isMaintainer={isMaintainer} />}
          {activeStep === 1 && <ScheduleStep />}
        </Box>
      </Stepper>

      <LoadingBackdrop isLoading={isLoading} />
    </>
  )
}
