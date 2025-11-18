import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import dayjs from 'dayjs'
import { useEffect } from 'react'

import {
  ScheduleDay,
  employeeScheduleByIdSelector,
  getEmployeeScheduleByIdApi,
} from '@entities/employee_schedules'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { Chip } from '@shared/ui/Chip'
import { CircularProgress } from '@shared/ui/CircularProgress'
import { DataGrid } from '@shared/ui/DataGrid'

import { getData } from '../model/helpers'
import { EmployeeScheduleModalDataProps } from '../model/types'

const DAYS: { key: ScheduleDay; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
]

const convertMinutesToTime = (minutes: number): dayjs.Dayjs => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return dayjs().hour(hours).minute(mins).second(0)
}

export const EmployeeScheduleModalData = ({
  employeeScheduleId,
}: EmployeeScheduleModalDataProps) => {
  const { status, employeeScheduleById } = useAppSelector(
    employeeScheduleByIdSelector
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getEmployeeScheduleByIdApi(employeeScheduleId))
  }, [employeeScheduleId, dispatch])

  if (!employeeScheduleById || status === 'pending') {
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

  const workTime = employeeScheduleById.work_time_table || {}

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <DataGrid
        dense
        data={getData(employeeScheduleById)}
        subtitleMaxWidth="350px"
      />

      <Table>
        <TableBody>
          {DAYS.map(({ key, label }) => {
            const slots = workTime[key] || []

            return (
              <TableRow
                key={key}
                sx={
                  slots.length === 0
                    ? {
                        backgroundColor: 'rgba(244, 67, 54, 0.08)',
                      }
                    : undefined
                }
              >
                <TableCell sx={{ width: 150, fontWeight: 500 }}>
                  {label}
                </TableCell>

                <TableCell>
                  {slots.length === 0 ? (
                    <Typography color="text.secondary" variant="body2">
                      WEEKEND
                    </Typography>
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                      {slots.map((slot, slotIndex) => (
                        <Chip
                          key={`${key}-${slotIndex}`}
                          label={`${convertMinutesToTime(slot.from).format('HH:mm')} - ${convertMinutesToTime(slot.to).format('HH:mm')}`}
                        />
                      ))}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </Box>
  )
}
