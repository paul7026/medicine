import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  getFavoursApi,
  getSelectedFavoursForFormApi,
  selectedFavoursForFormSelector,
} from '@entities/favours'
import { postFilialToFavourApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  EditFilialToFavoursFormProps,
  EditFilialToFavoursFormValues,
} from '../model/types'

export const EditFilialToFavoursForm = ({
  filialId,
  onClose,
}: EditFilialToFavoursFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { selectedFavoursForForm } = useAppSelector(
    selectedFavoursForFormSelector
  )

  const form = useForm<EditFilialToFavoursFormValues>({
    defaultValues: {
      favours: [],
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    if (!filialId) return

    dispatch(getSelectedFavoursForFormApi(`filial_id=${filialId}`))
  }, [dispatch, filialId])

  // Pre-fill favours from selectedFavoursForForm
  useEffect(() => {
    if (selectedFavoursForForm && selectedFavoursForForm.length > 0) {
      reset({
        favours: selectedFavoursForForm.map((favour) => favour.id),
      })
    } else {
      reset({ favours: [] })
    }
  }, [reset, selectedFavoursForForm])

  const onSubmit = ({ favours }: EditFilialToFavoursFormValues) => {
    setIsLoading(true)

    dispatch(
      postFilialToFavourApi({
        filial_id: filialId,
        favours,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Favours updated for filial')
        onClose()
        dispatch(getFavoursApi(`filial_id=${filialId}`))
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="edit-filial-to-favours-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
