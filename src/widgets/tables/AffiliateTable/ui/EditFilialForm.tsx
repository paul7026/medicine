import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  editFilialApi,
  filialByIdSelector,
  getFilialByIdApi,
  getFilialsApi,
} from '@entities/filials'

import { validationSchema } from '@features/AffiliateActions/model/validationSchema'
import { Fields } from '@features/AffiliateActions/ui/Fields'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { EditFilialFormProps, EditFilialFormValues } from '../model/types'

export const EditFilialForm = ({ filialId, onClose }: EditFilialFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, filialById } = useAppSelector(filialByIdSelector)

  const form = useForm<EditFilialFormValues>({
    defaultValues: {
      name: '',
      timezone: '',
      address: '',
      address_data: '',
      phones: '',
      description: '',
      social_media: '',
      email: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getFilialByIdApi(filialId))
  }, [dispatch, filialId])

  useEffect(() => {
    if (filialById) {
      reset({
        name: filialById.name,
        timezone: filialById.timezone || '',
        address: filialById.address,
        address_data: filialById.address_data || '',
        phones: filialById.phones || '',
        description: filialById.description || '',
        social_media: filialById.social_media || '',
        email: filialById.email || '',
        clinic_id: filialById.clinic_id,
      })
    }
  }, [filialById, reset])

  const onSubmit = (data: EditFilialFormValues) => {
    setIsLoading(true)

    dispatch(
      editFilialApi({
        filial_id: filialId,
        ...data,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Filial successfully edited')
        onClose()
        dispatch(getFilialsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if (status === 'pending' || !filialById) {
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
      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
