import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { createAdminApi } from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'

import { Fields } from './Fields'

import { CreateAdminFormProps, CreateAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateAdminForm = ({ onClose }: CreateAdminFormProps) => {
  const form = useForm<CreateAdminFormValues>({
    defaultValues: {
      tenant: '',
      clinic_id: '',
      is_superuser: false,
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = (data: CreateAdminFormValues) => {
    dispatch(createAdminApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Admin successfully created')
        onClose()
      })
      .catch((err) => {
        addErrorMessage(err)
      })
  }

  return (
    <FormProvider {...form}>
      <form id="create-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}
