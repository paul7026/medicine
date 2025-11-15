import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  createFavourApi,
  editFavourApi,
  favourByIdSelector,
  getFavourByIdApi,
  getFavoursApi,
} from '@entities/favours'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateFavourFormProps, CreateFavourFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateFavourForm = ({
  favourId,
  onClose,
}: CreateFavourFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, favourById } = useAppSelector(favourByIdSelector)

  const form = useForm<CreateFavourFormValues>({
    defaultValues: {
      title: '',
      favour_category_id: '',
      comment: '',
      duration: 1,
      online_switch_on: false,
      price: 0,
      currency: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (favourId) {
      dispatch(getFavourByIdApi(favourId as string))
    }
  }, [favourId, dispatch])

  useEffect(() => {
    if (favourById && favourId) {
      reset({
        title: favourById.title,
        favour_category_id: favourById.favour_category_id,
        comment: favourById.comment,
        duration: favourById.duration,
        online_switch_on: favourById.online_switch_on,
        price: favourById.price,
        currency: favourById.currency,
        clinic_id: favourById.clinic_id,
      })
    }
  }, [favourById, favourId, reset])

  const onSubmit = (data: CreateFavourFormValues) => {
    setIsLoading(true)

    if (favourId) {
      dispatch(editFavourApi({ favour_id: favourId as string, ...data }))
        .unwrap()
        .then(() => {
          addSuccessMessage('Favour successfully edited')
          onClose()
          dispatch(getFavoursApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }
    dispatch(createFavourApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Favour successfully created')
        onClose()
        dispatch(getFavoursApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if ((status === 'pending' || !favourById) && favourId) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 200,
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <FormProvider {...form}>
      <form
        id={favourId ? 'edit-favour-form' : 'create-favour-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
