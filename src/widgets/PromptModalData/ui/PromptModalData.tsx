import { useEffect } from 'react'

import { getPromptByIdApi, promptByIdSelector } from '@entities/prompts'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { PromptModalDataProps } from '../model/types'

export const PromptModalData = ({ promptId }: PromptModalDataProps) => {
  const { status, promptById } = useAppSelector(promptByIdSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPromptByIdApi(promptId))
  }, [dispatch, promptId])

  if (!promptById || status === 'pending') {
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
      <DataGrid dense data={getData(promptById)} />
    </Box>
  )
}
