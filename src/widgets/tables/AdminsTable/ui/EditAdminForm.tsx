import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { editAdminApi, getAdminsApi } from '@entities/admins'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { EditAdminFormProps, EditAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditAdminForm = ({ admin, onClose }: EditAdminFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditAdminFormValues>({
    defaultValues: {
      is_superuser: admin.is_superuser,
      password: '',
      username: admin.username,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = (data: EditAdminFormValues) => {
    dispatch(editAdminApi({ admin_id: admin.id, ...data }))
      .unwrap()
      .then(() => {
        addSuccessMessage('Admin successfully edited')
        onClose()
        dispatch(getAdminsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))

    onClose()
  }

  return (
    <FormProvider {...form}>
      <form id="edit-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
