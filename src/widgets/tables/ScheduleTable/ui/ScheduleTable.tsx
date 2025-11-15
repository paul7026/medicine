import { GridPaginationModel } from '@mui/x-data-grid'

import { useEffect, useState } from 'react'

import { getSlotsApi, slotsSelector } from '@entities/slots'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Table } from '@shared/ui/Table'

import { ScheduleFiltersComponent } from './ScheduleFilters'

import { getColumns } from '../model/getColumns'
import { ScheduleFilters } from '../model/types'

export const ScheduleTable = () => {
  const { status, slots, total, page, per_page } = useAppSelector(slotsSelector)

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page,
    pageSize: per_page,
  })

  const [filters, setFilters] = useState<ScheduleFilters>({})

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      getSlotsApi({
        page: paginationModel.page,
        per_page: paginationModel.pageSize,
        ...filters,
      })
    )
  }, [dispatch, paginationModel.page, paginationModel.pageSize, filters])

  const handleFiltersChange = (newFilters: ScheduleFilters) => {
    setFilters(newFilters)
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize })
  }

  const handleResetFilters = () => {
    setFilters({})
    setPaginationModel({ page: 0, pageSize: paginationModel.pageSize })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        flex: 1,
        minHeight: 0,
      }}
    >
      <ScheduleFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={handleResetFilters}
      />
      <Box sx={{ flex: 1, minHeight: 0 }}>
        <Table
          isSingleSelection
          columns={getColumns()}
          loading={status === 'pending'}
          paginationMode="server"
          paginationModel={paginationModel}
          rowCount={total}
          rows={slots}
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
    </Box>
  )
}
