import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  appointmentByIdSelector,
  createAppointmentApi,
  editAppointmentApi,
  getAppointmentByIdApi,
  getAppointmentsApi,
} from '@entities/appointments'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  CreateAppointmentFormProps,
  CreateAppointmentFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateAppointmentForm = ({
  appointmentId,
  onClose,
}: CreateAppointmentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, appointmentById } = useAppSelector(appointmentByIdSelector)

  const tenant = getTenantType()

  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateAppointmentFormValues>({
    defaultValues: {
      clinic_id: '',
      user_id: '',
      status: '',
      contact: '',
      favour_id: '',
      filial_id: '',
      employee_id: '',
      slot_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer, appointmentId)),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointmentByIdApi(appointmentId as string))
    }
  }, [appointmentId, dispatch])

  useEffect(() => {
    if (appointmentById && appointmentId) {
      reset({
        clinic_id: appointmentById.clinic_id,
        user_id: appointmentById.user_id,
        status: appointmentById.status,
        contact: appointmentById.contact,
        favour_id: appointmentById.favour_id,
        filial_id: appointmentById.filial_id,
        employee_id: appointmentById.employee_id,
      })
    }
  }, [appointmentById, appointmentId, reset])

  const onSubmit = ({
    clinic_id,
    user_id,
    ...rest
  }: CreateAppointmentFormValues) => {
    setIsLoading(true)

    const payload = {
      ...rest,
      ...(isMaintainer && { clinic_id }),
    }

    if (appointmentId) {
      dispatch(
        editAppointmentApi({
          appointment_id: appointmentId as string,
          ...payload,
        })
      )
        .unwrap()
        .then(() => {
          addSuccessMessage('Appointment successfully edited')
          onClose()
          dispatch(getAppointmentsApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }

    dispatch(
      createAppointmentApi({
        ...(isMaintainer && { clinic_id }),
        user_id,
        ...payload,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Appointment successfully created')
        onClose()
        dispatch(getAppointmentsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if ((status === 'pending' || !appointmentById) && appointmentId) {
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
        id={appointmentId ? 'edit-appointment-form' : 'create-appointment-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields appointmentId={appointmentId} isMaintainer={isMaintainer} />

        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
