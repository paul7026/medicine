import { useEffect } from 'react'

import { favoursSelector, getFavoursApi } from '@entities/favours'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

interface FilialFavoursTableProps {
  filialId: string
}

export const FilialFavoursTable = ({ filialId }: FilialFavoursTableProps) => {
  const { favours, status } = useAppSelector(favoursSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!filialId) return
    dispatch(getFavoursApi(`filial_id=${filialId}`))
  }, [dispatch, filialId])

  return (
    <Box sx={{ height: 300 }}>
      <Table
        hideFooter
        isSingleSelection
        columns={getColumns()}
        loading={status === 'pending'}
        rows={favours}
      />
    </Box>
  )
}
