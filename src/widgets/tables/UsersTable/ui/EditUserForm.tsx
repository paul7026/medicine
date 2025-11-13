import { CircularProgress } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  editUserApi,
  getUserByIdApi,
  getUsersApi,
  userByIdSelector,
} from '@entities/users'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { EditUserFormProps, EditUserFormValues } from '../model/types'

export const EditUserForm = ({ userId, onClose }: EditUserFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, userById } = useAppSelector(userByIdSelector)

  const form = useForm<EditUserFormValues>({
    defaultValues: {
      name: '',
      country: '',
      date_of_birth: '',
      height: '',
      weight: '',
      gender: '',
      goal: '',
      custom_goal: '',
      complaints: [],
      custom_complaint: '',
      is_onboarded: false,
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  useEffect(() => {
    dispatch(getUserByIdApi(userId))
  }, [dispatch, userId])

  useEffect(() => {
    if (userById) {
      reset({
        name: userById.name,
        country: userById.country,
        date_of_birth: userById.date_of_birth,
        height: userById.height,
        weight: userById.weight,
        gender: userById.gender,
        goal: userById.goal,
        custom_goal: userById.custom_goal,
        complaints: userById.complaints ?? [],
        custom_complaint: userById.custom_complaint,
        is_onboarded: userById.is_onboarded,
      })
    }
  }, [userById, reset])

  const onSubmit = (data: EditUserFormValues) => {
    const { height, weight, ...restDat } = data

    dispatch(
      editUserApi({
        user_id: userId,
        height: Number(height),
        weight: Number(weight),
        ...restDat,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Admin successfully edited')
        onClose()
        dispatch(getUsersApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if (status === 'pending' || !userById) {
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
