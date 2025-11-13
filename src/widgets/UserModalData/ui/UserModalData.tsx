import { useEffect } from 'react'

import { getUserByIdApi, userByIdSelector } from '@entities/users'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { UserModalDataProps } from '../model/types'

export const UserModalData = ({ userId }: UserModalDataProps) => {
  const { status, userById } = useAppSelector(userByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserByIdApi(userId))
  }, [dispatch, userId])

  if (!userById || status === 'pending') {
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
      <DataGrid dense data={getData(userById)} />
    </Box>
  )
}
