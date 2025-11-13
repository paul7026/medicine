import { useEffect } from 'react'

import { clinicByIdSelector, getClinicByIdApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { ClinicModalDataProps } from '../model/types'

export const ClinicModalData = ({ clinicId }: ClinicModalDataProps) => {
  const { status, clinicById } = useAppSelector(clinicByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicByIdApi(clinicId))
  }, [clinicId, dispatch])

  if (!clinicById || status === 'pending') {
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
      <DataGrid dense data={getData(clinicById)} subtitleMaxWidth="350px" />
    </Box>
  )
}
