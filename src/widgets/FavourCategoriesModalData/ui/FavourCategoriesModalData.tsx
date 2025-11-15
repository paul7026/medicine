import { useEffect } from 'react'

import {
  favourCategoryByIdSelector,
  getFavourCategoryByIdApi,
} from '@entities/favourCategory'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { FavourCategoriesModalDataProps } from '../model/types'

export const FavourCategoriesModalData = ({
  categoryId,
}: FavourCategoriesModalDataProps) => {
  const { favourCategoryById, status } = useAppSelector(
    favourCategoryByIdSelector
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFavourCategoryByIdApi(categoryId))
  }, [categoryId, dispatch])

  if (!favourCategoryById || status === 'pending') {
    return (
      <Box
        sx={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid
        dense
        data={getData(favourCategoryById)}
        subtitleMaxWidth="350px"
      />
    </Box>
  )
}
