import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  clinicByIdSelector,
  createClinicApi,
  editClinicApi,
  getClinicByIdApi,
  getClinicsApi,
} from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateClinicFormProps, CreateClinicFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateClinicForm = ({
  clinicId,
  onClose,
}: CreateClinicFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, clinicById } = useAppSelector(clinicByIdSelector)

  const form = useForm<CreateClinicFormValues>({
    defaultValues: {
      description: '',
      email: '',
      legal_address: '',
      legal_name: '',
      managed_by: '',
      phones: '',
      title: '',
      website: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (clinicId) {
      dispatch(getClinicByIdApi(clinicId as string))
    }
  }, [clinicId, dispatch])

  useEffect(() => {
    if (clinicById && clinicId) {
      reset({
        description: clinicById.description,
        email: clinicById.email,
        legal_address: clinicById.legal_address,
        legal_name: clinicById.legal_name,
        managed_by: clinicById.managed_by,
        phones: clinicById.phones,
        title: clinicById.title,
        website: clinicById.website,
      })
    }
  }, [clinicById, clinicId, reset])

  const onSubmit = (data: CreateClinicFormValues) => {
    setIsLoading(true)

    if (clinicId) {
      dispatch(editClinicApi({ clinic_id: clinicId as string, ...data }))
        .unwrap()
        .then(() => {
          addSuccessMessage('Clinic successfully edited')
          onClose()
          dispatch(getClinicsApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }

    dispatch(createClinicApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Clinic successfully created')
        onClose()
        dispatch(getClinicsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if (status === 'pending' || !clinicById) {
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
        id={clinicId ? 'edit-form' : 'create-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
