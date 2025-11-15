import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  createScheduleConnectionApi,
  getScheduleConnectionsApi,
} from '@entities/schedule_connections'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  CreateScheduleConnectionFormProps,
  CreateScheduleConnectionFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateScheduleConnectionForm = ({
  onClose,
}: CreateScheduleConnectionFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const tenant = getTenantType()

  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateScheduleConnectionFormValues>({
    defaultValues: {
      clinic_id: '',
      type: '',
      partner_token: '',
      user_token: '',
      login: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer)),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = ({
    clinic_id,
    ...rest
  }: CreateScheduleConnectionFormValues) => {
    setIsLoading(true)

    dispatch(
      createScheduleConnectionApi({
        ...(isMaintainer && { clinic_id }),
        ...rest,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Schedule connection successfully created')
        onClose()
        dispatch(getScheduleConnectionsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
