import { CircularProgress } from '@mui/material'

import dayjs from 'dayjs'
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
      date_of_birth: null,
      height: '',
      weight: '',
      gender: '',
      goal: '',
      custom_goal: '',
      complaints: [],
      custom_complaint: '',
      is_onboarded: false,
      lifestyle_workout_frequency: '',
      lifestyle_physical_activities: [],
      lifestyle_custom_activities: [],
      lifestyle_eating_habits: [],
      lifestyle_custom_habits: '',
      lifestyle_meal_frequency: '',
      lifestyle_water_intake: '',
      lifestyle_stress_level: '',
      contraindications_allergies: [],
      contraindications_custom_allergies: [],
      contraindications_chronic_conditions: [],
      contraindications_custom_conditions: [],
      contraindications_health_conditions: [],
      contraindications_medication_restrictions: [],
      contraindications_custom_restrictions: [],
      contraindications_ethical_choices: [],
      contraindications_custom_features: [],
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
      const lifestyle = userById.lifestyle ?? {}
      const contraindications = userById.contraindications ?? {}

      const normalizeArray = (value?: (string | null)[]) =>
        (value ?? []).map((item) => item ?? '')

      reset({
        name: userById.name,
        country: userById.country,
        date_of_birth: userById.date_of_birth
          ? dayjs(userById.date_of_birth)
          : null,
        height: userById.height,
        weight: userById.weight,
        gender: userById.gender,
        goal: userById.goal,
        custom_goal: userById.custom_goal,
        complaints: userById.complaints ?? [],
        custom_complaint: userById.custom_complaint,
        is_onboarded: userById.is_onboarded,
        lifestyle_workout_frequency: lifestyle.workout_frequency ?? '',
        lifestyle_physical_activities: normalizeArray(
          lifestyle.physical_activities
        ),
        lifestyle_custom_activities: normalizeArray(
          lifestyle.custom_activities
        ),
        lifestyle_eating_habits: normalizeArray(lifestyle.eating_habits),
        lifestyle_custom_habits: lifestyle.custom_habits ?? '',
        lifestyle_meal_frequency: lifestyle.meal_frequency ?? '',
        lifestyle_water_intake: lifestyle.water_intake ?? '',
        lifestyle_stress_level: lifestyle.stress_level ?? '',
        contraindications_allergies: normalizeArray(
          contraindications.allergies
        ),
        contraindications_custom_allergies: normalizeArray(
          contraindications.custom_allergies
        ),
        contraindications_chronic_conditions: normalizeArray(
          contraindications.chronic_conditions
        ),
        contraindications_custom_conditions: normalizeArray(
          contraindications.custom_conditions
        ),
        contraindications_health_conditions: normalizeArray(
          contraindications.health_conditions
        ),
        contraindications_medication_restrictions: normalizeArray(
          contraindications.medication_restrictions
        ),
        contraindications_custom_restrictions: normalizeArray(
          contraindications.custom_restrictions
        ),
        contraindications_ethical_choices: normalizeArray(
          contraindications.ethical_choices
        ),
        contraindications_custom_features: normalizeArray(
          contraindications.custom_features
        ),
      })
    }
  }, [userById, reset])

  const onSubmit = (data: EditUserFormValues) => {
    const {
      height,
      weight,
      date_of_birth,
      lifestyle_workout_frequency,
      lifestyle_physical_activities,
      lifestyle_custom_activities,
      lifestyle_eating_habits,
      lifestyle_custom_habits,
      lifestyle_meal_frequency,
      lifestyle_water_intake,
      lifestyle_stress_level,
      contraindications_allergies,
      contraindications_custom_allergies,
      contraindications_chronic_conditions,
      contraindications_custom_conditions,
      contraindications_health_conditions,
      contraindications_medication_restrictions,
      contraindications_custom_restrictions,
      contraindications_ethical_choices,
      contraindications_custom_features,
      ...restDat
    } = data

    const formattedDateOfBirth =
      date_of_birth && dayjs.isDayjs(date_of_birth) && date_of_birth.isValid()
        ? date_of_birth.format('YYYY-MM-DD')
        : null

    const normalizeArrayForPayload = (value: string[]) =>
      value.map((item) => item.trim()).filter((item) => item.length > 0)

    const lifestyle = {
      workout_frequency: lifestyle_workout_frequency || undefined,
      physical_activities: normalizeArrayForPayload(
        lifestyle_physical_activities
      ),
      custom_activities: normalizeArrayForPayload(lifestyle_custom_activities),
      eating_habits: normalizeArrayForPayload(lifestyle_eating_habits),
      custom_habits: lifestyle_custom_habits || undefined,
      meal_frequency: lifestyle_meal_frequency || undefined,
      water_intake: lifestyle_water_intake || undefined,
      stress_level: lifestyle_stress_level || undefined,
    }

    const contraindications = {
      allergies: normalizeArrayForPayload(contraindications_allergies),
      custom_allergies: normalizeArrayForPayload(
        contraindications_custom_allergies
      ),
      chronic_conditions: normalizeArrayForPayload(
        contraindications_chronic_conditions
      ),
      custom_conditions: normalizeArrayForPayload(
        contraindications_custom_conditions
      ),
      health_conditions: normalizeArrayForPayload(
        contraindications_health_conditions
      ),
      medication_restrictions: normalizeArrayForPayload(
        contraindications_medication_restrictions
      ),
      custom_restrictions: normalizeArrayForPayload(
        contraindications_custom_restrictions
      ),
      ethical_choices: normalizeArrayForPayload(
        contraindications_ethical_choices
      ),
      custom_features: normalizeArrayForPayload(
        contraindications_custom_features
      ),
    }

    dispatch(
      editUserApi({
        user_id: userId,
        height: Number(height),
        weight: Number(weight),
        ...restDat,
        date_of_birth: formattedDateOfBirth,
        lifestyle,
        contraindications,
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
