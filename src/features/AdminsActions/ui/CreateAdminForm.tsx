import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createAdminApi, getAdminsApi } from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateAdminFormProps, CreateAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateAdminForm = ({ onClose }: CreateAdminFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateAdminFormValues>({
    defaultValues: {
      tenant: '',
      is_superuser: false,
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = ({
    is_superuser,
    password,
    tenant,
    username,
    clinic_id,
  }: CreateAdminFormValues) => {
    setIsLoading(true)

    dispatch(
      createAdminApi({
        is_superuser,
        password,
        tenant,
        username,
        ...(clinic_id && { clinic_id }),
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Admin successfully created')
        onClose()
        dispatch(getAdminsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
