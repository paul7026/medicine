import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  favourToFilialApi,
  getFilialsApi,
  getSelectedFilialsForFormApi,
  selectedFilialsForFormSelector,
} from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  EditFavourToFilialsFormProps,
  EditFavourToFilialsFormValues,
} from '../model/types'

export const EditFavoursToFilialsForm = ({
  favourId,
  onClose,
}: EditFavourToFilialsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { selectedFilialsForForm } = useAppSelector(
    selectedFilialsForFormSelector
  )

  const form = useForm<EditFavourToFilialsFormValues>({
    defaultValues: {
      filials: [],
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    if (!favourId) return

    dispatch(getSelectedFilialsForFormApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  // Pre-fill filials from selectedFilialsForForm
  useEffect(() => {
    if (selectedFilialsForForm && selectedFilialsForForm.length > 0) {
      reset({
        filials: selectedFilialsForForm.map((filial) => filial.id),
      })
    } else {
      reset({ filials: [] })
    }
  }, [reset, selectedFilialsForForm])

  const onSubmit = ({ filials }: EditFavourToFilialsFormValues) => {
    setIsLoading(true)

    dispatch(
      favourToFilialApi({
        favour_id: favourId,
        filials,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Filials updated for favour')
        onClose()
        dispatch(getFilialsApi(`favour_id=${favourId}`))
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="edit-favour-to-filials-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
