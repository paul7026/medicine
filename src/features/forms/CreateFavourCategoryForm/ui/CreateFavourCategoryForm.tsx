import { yupResolver } from '@hookform/resolvers/yup'

import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
  createFavourCategoryApi,
  editFavourCategoryApi,
  favourCategoryByIdSelector,
  getFavourCategoriesApi,
  getFavourCategoryByIdApi,
} from '@entities/favourCategory'

import { getTenantType } from '@shared/helpers/getTenantType'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { useSystemMessage } from '@shared/hooks/useSystemMessage'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { LoadingBackdrop } from '@shared/ui/LoadingBackdrop'

import { Fields } from './Fields'

import {
  CreateFavourCategoryFormProps,
  CreateFavourCategoryFormValues,
} from '../model/types'
import { validationSchema } from '../model/validationSchema'

export const CreateFavourCategoryForm = ({
  categoryId,
  onClose,
}: CreateFavourCategoryFormProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { status, favourCategoryById } = useAppSelector(
    favourCategoryByIdSelector
  )

  const tenant = getTenantType()

  const isMaintainer = tenant === 'maintainer'

  const form = useForm<CreateFavourCategoryFormValues>({
    defaultValues: {
      title: '',
      description: '',
      clinic_id: '',
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(validationSchema(isMaintainer, categoryId)),
  })

  const { handleSubmit, reset } = form
  const { addErrorMessage, addSuccessMessage } = useSystemMessage()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId) {
      dispatch(getFavourCategoryByIdApi(categoryId as string))
    }
  }, [categoryId, dispatch])

  useEffect(() => {
    if (favourCategoryById && categoryId) {
      reset({
        title: favourCategoryById.title,
        clinic_id: favourCategoryById.clinic_id,
        description: favourCategoryById.description,
      })
    }
  }, [favourCategoryById, categoryId, reset])

  const onSubmit = ({ clinic_id, ...rest }: CreateFavourCategoryFormValues) => {
    setIsLoading(true)

    if (categoryId) {
      dispatch(
        editFavourCategoryApi({
          category_id: categoryId as string,
          ...(isMaintainer && !categoryId && { clinic_id }),
          ...rest,
        })
      )
        .unwrap()
        .then(() => {
          addSuccessMessage('Favour category successfully edited')
          onClose()
          dispatch(getFavourCategoriesApi())
        })
        .catch((err) => {
          addErrorMessage(err)
        })
        .finally(() => setIsLoading(false))

      return
    }

    dispatch(
      createFavourCategoryApi({ ...(isMaintainer && { clinic_id }), ...rest })
    )
      .unwrap()
      .then(() => {
        addSuccessMessage('Favour category successfully created')
        onClose()
        dispatch(getFavourCategoriesApi())
      })
      .catch((err) => {
        addErrorMessage(err)
      })
      .finally(() => setIsLoading(false))
  }

  if ((status === 'pending' || !favourCategoryById) && categoryId) {
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
        id={
          categoryId
            ? 'edit-favour-category-form'
            : 'create-favour-category-form'
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        <Fields categoryId={categoryId} isMaintainer={isMaintainer} />

        <LoadingBackdrop isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
