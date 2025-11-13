import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { createAdminApi } from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'

import { Fields } from './Fields'

import { CreateClinicFormProps, CreateClinicFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateClinicForm = ({ onClose }: CreateClinicFormProps) => {
  const form = useForm<CreateClinicFormValues>({
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

  const onSubmit = (data: CreateClinicFormValues) => {
    dispatch(createAdminApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Clinic successfully created')
        onClose()
      })
      .catch((err) => {
        addErrorMessage(err)
      })
  }

  return (
    <FormProvider {...form}>
      <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
      </form>
    </FormProvider>
  )
}
