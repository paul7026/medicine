import { useEffect } from 'react'

import { documentByIdSelector, getDocumentByIdApi } from '@entities/documents'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { DocumentModalDataProps } from '../model/types'
import { getData } from '../model/helpers'

export const DocumentModalData = ({ documentId }: DocumentModalDataProps) => {
  const { documentById, status } = useAppSelector(documentByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getDocumentByIdApi(documentId))
  }, [documentId, dispatch])

  if (!documentById || status === 'pending') {
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
      <DataGrid dense data={getData(documentById)} subtitleMaxWidth="350px" />
    </Box>
  )
}
