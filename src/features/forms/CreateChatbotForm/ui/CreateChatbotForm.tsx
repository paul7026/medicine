import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  chatbotByIdSelector,
  createChatbotApi,
  editChatbotApi,
  getChatbotByIdApi,
  getChatbotsApi,
} from '@entities/chatbots'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import { CreateChatbotFormProps, CreateChatbotFormValues } from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateChatbotForm = ({
  chatbotId,
  onClose,
}: CreateChatbotFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, chatbotById } = useAppSelector(chatbotByIdSelector)

  const tenant = getTenantType()

  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateChatbotFormValues>({
    defaultValues: {
      clinic_id: '',
      platform: '',
      bot_token: '',
      api_key: '',
      webhook_url: '',
      config: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer, chatbotId)),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (chatbotId) {
      dispatch(getChatbotByIdApi(chatbotId as string))
    }
  }, [chatbotId, dispatch])

  useEffect(() => {
    if (chatbotById && chatbotId) {
      reset({
        clinic_id: chatbotById.clinic_id,
        platform: chatbotById.platform,
        bot_token: chatbotById.bot_token,
        api_key: chatbotById.api_key,
        webhook_url: chatbotById.webhook_url,
        config: JSON.stringify(chatbotById.config, null, 2),
      })
    }
  }, [chatbotById, chatbotId, reset])

  const onSubmit = ({
    clinic_id,
    platform,
    ...rest
  }: CreateChatbotFormValues) => {
    setIsLoading(true)

    const payload = {
      ...rest,
      config: JSON.parse(rest.config || '{}'),
    }

    if (chatbotId) {
      dispatch(
        editChatbotApi({
          chatbot_id: chatbotId as string,
          ...payload,
        })
      )
        .unwrap()
        .then(() => {
          addSuccessMessage('Chatbot successfully edited')
          onClose()
          dispatch(getChatbotsApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }

    dispatch(
      createChatbotApi({
        ...(isMaintainer && { clinic_id }),
        platform,
        ...payload,
      })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Chatbot successfully created')
        onClose()
        dispatch(getChatbotsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if ((status === 'pending' || !chatbotById) && chatbotId) {
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
        id={chatbotId ? 'edit-chatbot-form' : 'create-chatbot-form'}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields chatbotId={chatbotId} isMaintainer={isMaintainer} />
        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
