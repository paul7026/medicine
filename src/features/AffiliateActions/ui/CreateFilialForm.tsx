import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createFilialApi, getFilialsApi } from '@entities/filials'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateFilialFormProps, CreateFilialFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateFilialForm = ({ onClose }: CreateFilialFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateFilialFormValues>({
    defaultValues: {
      name: '',
      timezone: '',
      address: '',
      address_data: '',
      phones: '',
      description: '',
      social_media: '',
      email: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer)),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = ({ clinic_id, ...rest }: CreateFilialFormValues) => {
    setIsLoading(true)

    dispatch(createFilialApi({ ...(isMaintainer && { clinic_id }), ...rest }))
      .unwrap()
      .then(() => {
        addSuccessMessage('Filial successfully created')
        onClose()
        dispatch(getFilialsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-filial-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
