import { useEffect } from 'react'

import { filialByIdSelector, getFilialByIdApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { AffiliateModalDataProps } from '../model/types'

export const AffiliateModalData = ({ filialId }: AffiliateModalDataProps) => {
  const { status, filialById } = useAppSelector(filialByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getFilialByIdApi(filialId))
  }, [dispatch, filialId])

  if (!filialById || status === 'pending') {
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
      <DataGrid dense data={getData(filialById)} />
    </Box>
  )
}
