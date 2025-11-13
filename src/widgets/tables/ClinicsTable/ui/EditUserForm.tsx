import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { Fields } from './Fields'

import { EditUserFormProps, EditUserFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditUserForm = ({ onClose }: EditUserFormProps) => {
  const form = useForm<EditUserFormValues>({
    defaultValues: {
      is_superuser: false,
      password: '',
      username: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const onSubmit = (data: EditUserFormValues) => {
    console.log(data)
    onClose()
  }

  return (
    <FormProvider {...form}>
      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}
