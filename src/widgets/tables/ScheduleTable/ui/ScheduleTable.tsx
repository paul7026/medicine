import { useState } from 'react'

import { Table } from '@shared/ui/Table'

import { getColumns } from '../model/getColumns'

type ScheduleRow = {
  id: string
  clinic_id: string
  filial_id: string
  favour_id: string
  employee_id: string
  start_time: string
  end_time: string
  format: string
  is_available: boolean
}

const mockSchedules: ScheduleRow[] = [
  {
    id: '1',
    clinic_id: 'clinic-1',
    filial_id: 'filial-1',
    favour_id: 'favour-1',
    employee_id: 'employee-1',
    start_time: '2024-01-15T09:00:00Z',
    end_time: '2024-01-15T10:00:00Z',
    format: 'online',
    is_available: true,
  },
  {
    id: '2',
    clinic_id: 'clinic-2',
    filial_id: 'filial-2',
    favour_id: 'favour-2',
    employee_id: 'employee-2',
    start_time: '2024-01-15T10:30:00Z',
    end_time: '2024-01-15T11:30:00Z',
    format: 'offline',
    is_available: true,
  },
  {
    id: '3',
    clinic_id: 'clinic-1',
    filial_id: 'filial-1',
    favour_id: 'favour-3',
    employee_id: 'employee-3',
    start_time: '2024-01-15T14:00:00Z',
    end_time: '2024-01-15T15:00:00Z',
    format: 'online',
    is_available: false,
  },
  {
    id: '4',
    clinic_id: 'clinic-3',
    filial_id: 'filial-3',
    favour_id: 'favour-1',
    employee_id: 'employee-1',
    start_time: '2024-01-16T08:00:00Z',
    end_time: '2024-01-16T09:00:00Z',
    format: 'offline',
    is_available: true,
  },
  {
    id: '5',
    clinic_id: 'clinic-2',
    filial_id: 'filial-2',
    favour_id: 'favour-2',
    employee_id: 'employee-4',
    start_time: '2024-01-16T11:00:00Z',
    end_time: '2024-01-16T12:00:00Z',
    format: 'online',
    is_available: true,
  },
]

export const ScheduleTable = () => {
  const [rows] = useState(mockSchedules)

  return (
    <Table
      isSingleSelection
      columns={getColumns()}
      loading={false}
      rows={rows}
    />
  )
}
