import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createClinicApi, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateClinicFormProps, CreateClinicFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateClinicForm = ({ onClose }: CreateClinicFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateClinicFormValues>({
    defaultValues: {
      description: '',
      email: '',
      legal_address: '',
      legal_name: '',
      managed_by: '',
      phones: '',
      title: '',
      website: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = (data: CreateClinicFormValues) => {
    setIsLoading(true)
    dispatch(createClinicApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Clinic successfully created')
        onClose()
        dispatch(getClinicsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
