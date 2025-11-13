import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { Fields } from './Fields'

import { CreateAdminFormProps, CreateAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateAdminForm = ({ onClose }: CreateAdminFormProps) => {
  const form = useForm<CreateAdminFormValues>({
    defaultValues: {
      tenant: '',
      clinic: '',
      is_superuser: false,
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const onSubmit = (data: CreateAdminFormValues) => {
    console.log(data)
    onClose()
  }

  return (
    <FormProvider {...form}>
      <form id="create-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}
