import { yupResolver } from '@hookform/resolvers/yup'
import { CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  editScheduleConnectionApi,
  getScheduleConnectionByIdApi,
  getScheduleConnectionsApi,
  scheduleConnectionByIdSelector,
} from '@entities/schedule_connections'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  EditScheduleConnectionFormProps,
  EditScheduleConnectionFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditScheduleConnectionForm = ({
  connectionId,
  onClose,
}: EditScheduleConnectionFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, scheduleConnectionById } = useAppSelector(
    scheduleConnectionByIdSelector
  )

  const form = useForm<EditScheduleConnectionFormValues>({
    defaultValues: {
      partner_token: '',
      user_token: '',
      login: '',
      password: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit, reset } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getScheduleConnectionByIdApi(connectionId))
  }, [dispatch, connectionId])

  useEffect(() => {
    if (scheduleConnectionById) {
      reset({
        partner_token: scheduleConnectionById.partner_token || '',
        user_token: scheduleConnectionById.user_token || '',
        login: scheduleConnectionById.login || '',
        password: scheduleConnectionById.password || '',
      })
    }
  }, [scheduleConnectionById, reset])

  const onSubmit = (data: EditScheduleConnectionFormValues) => {
    setIsLoading(true)

    dispatch(
      editScheduleConnectionApi({
        connection_id: connectionId,
        ...data,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Schedule connection successfully edited')
        onClose()
        dispatch(getScheduleConnectionsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if (status === 'pending' || !scheduleConnectionById) {
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
