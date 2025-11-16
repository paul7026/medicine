import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  favourToFilialApi,
  filialsSelector,
  getFilialsApi,
} from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { ChangeFilialsFormProps, ChangeFilialsFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const ChangeFilialsForm = ({
  closeModal,
  favourId,
  filialsDefault,
}: ChangeFilialsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { filials, status } = useAppSelector(filialsSelector)

  const form = useForm<ChangeFilialsFormValues>({
    defaultValues: {
      filials: filialsDefault,
    },
    mode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form

  const autocompleteOptions = filials.map((filial) => ({
    id: filial.id,
    label: filial.name,
  }))

  const { addSuccessMessage, addErrorMessage } = useSystemMessage()
  const dispatch = useAppDispatch()

  const onSubmit = (data: ChangeFilialsFormValues) => {
    setIsLoading(true)

    dispatch(favourToFilialApi({ favour_id: favourId, ...data }))
      .unwrap()
      .then(() => {
        closeModal()
        reset()
        addSuccessMessage('Filials changed')
      })
      .catch((err) => addErrorMessage(err))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    dispatch(getFilialsApi(`favour_id=${favourId}`))
  }, [dispatch, favourId])

  return (
    <form id="change-filials-form" onSubmit={handleSubmit(onSubmit)}>
      <LoadingBackdrop isLoading={isLoading} />

      <AutocompleteControl
        fullWidth
        multiple
        form={form}
        label="Filials"
        loading={status === 'pending'}
        name="filials"
        options={autocompleteOptions}
      />
    </form>
  )
}
