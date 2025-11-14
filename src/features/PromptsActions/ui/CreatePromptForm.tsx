import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createPromptApi, getPromptsApi } from '@entities/prompts'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreatePromptFormProps, CreatePromptFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreatePromptForm = ({ onClose }: CreatePromptFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreatePromptFormValues>({
    defaultValues: {
      name: '',
      content: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = (data: CreatePromptFormValues) => {
    setIsLoading(true)

    dispatch(createPromptApi(data))
      .unwrap()
      .then(() => {
        addSuccessMessage('Prompt successfully created')
        onClose()
        dispatch(getPromptsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="create-prompt-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
