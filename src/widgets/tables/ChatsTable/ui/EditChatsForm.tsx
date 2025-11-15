import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { editChatApi, getChatsApi } from '@entities/chats'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { EditChatsFormProps, EditChatsFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const EditChatsForm = ({ chatId, onClose }: EditChatsFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EditChatsFormValues>({
    defaultValues: {
      message: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const dispatch = useAppDispatch()
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const onSubmit = (data: EditChatsFormValues) => {
    setIsLoading(true)

    dispatch(
      editChatApi({
        chat_id: chatId,
        ...data,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Message sent successfully')
        onClose()
        dispatch(getChatsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
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
