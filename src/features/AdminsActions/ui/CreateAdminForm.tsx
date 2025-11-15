import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { adminsSelector, createAdminApi, getAdminsApi } from '@entities/admins'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateAdminFormProps, CreateAdminFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateAdminForm = ({ onClose }: CreateAdminFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { page, per_page } = useAppSelector(adminsSelector)

  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateAdminFormValues>({
    defaultValues: {
      tenant: '',
      is_superuser: false,
      password: '',
      username: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer)),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = ({
    is_superuser,
    password,
    tenant: formTenant,
    username,
    clinic_id,
  }: CreateAdminFormValues) => {
    setIsLoading(true)

    dispatch(
      createAdminApi({
        is_superuser,
        password,
        tenant: isMaintainer ? formTenant || '' : tenant || 'clinic',
        username,
        ...(isMaintainer && clinic_id && { clinic_id }),
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Admin successfully created')
        onClose()
        dispatch(
          getAdminsApi({
            page,
            per_page,
          })
        )
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-admin-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
