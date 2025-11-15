import { yupResolver } from '@hookform/resolvers/yup'

import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { createDocumentApi, getDocumentsApi } from '@entities/documents'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  UploadDocumentFormProps,
  UploadDocumentFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const UploadDocumentForm = ({ onClose }: UploadDocumentFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<UploadDocumentFormValues>({
    defaultValues: {
      name: '',
      file: null,
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema()),
  })

  const { handleSubmit } = form

  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  const onSubmit = ({ file, clinic_id, name }: UploadDocumentFormValues) => {
    if (!file) {
      return
    }

    setIsLoading(true)

    dispatch(createDocumentApi({ file, name, clinic_id }))
      .unwrap()
      .then(() => {
        addSuccessMessage('Document successfully uploaded')
        onClose()
        dispatch(getDocumentsApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <FormProvider {...form}>
      <form id="upload-document-form" onSubmit={handleSubmit(onSubmit)}>
        <Fields />

        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
