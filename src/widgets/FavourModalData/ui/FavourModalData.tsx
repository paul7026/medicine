import { useEffect } from 'react'

import { favourByIdSelector, getFavourByIdApi } from '@entities/favours'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { FavourModalDataProps } from '../model/types'
import { getData } from '../model/helpers'

export const FavourModalData = ({ favourId }: FavourModalDataProps) => {
  const { favourById, status } = useAppSelector(favourByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFavourByIdApi(favourId))
  }, [favourId, dispatch])

  if (!favourById || status === 'pending') {
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
      <DataGrid dense data={getData(favourById)} subtitleMaxWidth="350px" />
    </Box>
  )
}
