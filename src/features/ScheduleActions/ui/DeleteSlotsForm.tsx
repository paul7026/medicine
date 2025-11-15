import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { deleteSlotsApi, getSlotsApi } from '@entities/slots'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { SlotsFormProps, SlotsFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const DeleteSlotsForm = ({ onClose }: SlotsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const tenant = getTenantType()
  const isMaintainer = tenant === 'maintainer'

  const form = useForm<SlotsFormValues>({
    defaultValues: {
      from_date: null,
      to_date: null,
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer)),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = ({ from_date, to_date, clinic_id }: SlotsFormValues) => {
    if (!from_date || !to_date) {
      return
    }

    setIsLoading(true)

    dispatch(
      deleteSlotsApi({
        from_date: from_date.format('YYYY-MM-DD'),
        to_date: to_date.format('YYYY-MM-DD'),
        ...(isMaintainer && { clinic_id }),
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Slots deleted successfully')
        onClose()
        dispatch(getSlotsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="delete-slots-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
