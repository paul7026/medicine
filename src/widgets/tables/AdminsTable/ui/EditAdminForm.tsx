import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { Fields } from './Fields'

import { EditAdminFormProps, EditAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditAdminForm = ({ onClose }: EditAdminFormProps) => {
  const form = useForm<EditAdminFormValues>({
    defaultValues: {
      is_superuser: false,
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const onSubmit = (data: EditAdminFormValues) => {
    console.log(data)
    onClose()
  }

  return (
    <FormProvider {...form}>
      <form id="edit-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}
