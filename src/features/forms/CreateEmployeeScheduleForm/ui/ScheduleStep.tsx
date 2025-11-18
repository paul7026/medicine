import AddIcon from '@mui/icons-material/Add'
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { ScheduleDay, ScheduleSlot } from '@entities/employee_schedules'

import { Box } from '@shared/ui/Box'
import { Chip } from '@shared/ui/Chip'
import { Modal } from '@shared/ui/Modal'
import { TimePicker } from '@shared/ui/TimePicker'

import { CreateEmployeeScheduleFormValues } from '../model/types'

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

const convertTimeToMinutes = (time: dayjs.Dayjs | null): number => {
  if (!time) {
    return 0
  }

  return time.hour() * 60 + time.minute()
}

export const ScheduleStep = () => {
  const form = useFormContext<CreateEmployeeScheduleFormValues>()
  const { setValue, control } = form

  const emptyWorkTime = useMemo<Record<ScheduleDay, ScheduleSlot[]>>(
    () => ({
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    }),
    []
  )

  const workTime = useWatch({
    control,
    name: 'work_time',
  })

  useEffect(() => {
    if (workTime === undefined) {
      setValue('work_time', emptyWorkTime, { shouldDirty: false })
    }
  }, [emptyWorkTime, setValue, workTime])

  const safeWorkTime = workTime ?? emptyWorkTime

  const normalizeToHour = (time: dayjs.Dayjs | null): dayjs.Dayjs => {
    if (!time) {
      return dayjs().hour(0).minute(0).second(0)
    }

    return time.minute(0).second(0)
  }

  const [slotModalState, setSlotModalState] = useState<{
    isOpen: boolean
    day: ScheduleDay | null
    from: dayjs.Dayjs | null
    to: dayjs.Dayjs | null
    error: string | null
  }>({
    isOpen: false,
    day: null,
    from: null,
    to: null,
    error: null,
  })

  const openSlotModal = (day: ScheduleDay) => {
    setSlotModalState({
      isOpen: true,
      day,
      from: null,
      to: null,
      error: null,
    })
  }

  const closeSlotModal = () =>
    setSlotModalState((prev) => ({
      ...prev,
      isOpen: false,
      day: null,
      error: null,
    }))

  const handleSlotModalSubmit = () => {
    if (!slotModalState.day || !slotModalState.from || !slotModalState.to) {
      setSlotModalState((prev) => ({
        ...prev,
        error: 'Please select both start and end times',
      }))

      return
    }

    const fromMinutes = convertTimeToMinutes(slotModalState.from)
    const toMinutes = convertTimeToMinutes(slotModalState.to)

    if (toMinutes <= fromMinutes) {
      setSlotModalState((prev) => ({
        ...prev,
        error: 'End time must be later than start time',
      }))

      return
    }

    const day = slotModalState.day
    const hasDuplicate = safeWorkTime[day].some(
      (slot) => slot.from === fromMinutes && slot.to === toMinutes
    )

    if (hasDuplicate) {
      setSlotModalState((prev) => ({
        ...prev,
        error: 'This time slot already exists',
      }))

      return
    }

    const newSlots = [
      ...safeWorkTime[day],
      { from: fromMinutes, to: toMinutes },
    ]
    const updated = { ...safeWorkTime, [day]: newSlots }

    setValue('work_time', updated, {
      shouldDirty: true,
      shouldTouch: true,
    })

    closeSlotModal()
  }

  const handleRemoveSlot = (day: ScheduleDay, index: number) => {
    const newSlots = safeWorkTime[day].filter((_, idx) => idx !== index)
    const updated = { ...safeWorkTime, [day]: newSlots }

    setValue('work_time', updated, {
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  return (
    <>
      <Table>
        <TableBody>
          {DAYS.map(({ key, label }) => {
            const slots = safeWorkTime[key]

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
                          onDelete={() => handleRemoveSlot(key, slotIndex)}
                        />
                      ))}
                    </Box>
                  )}
                </TableCell>

                <TableCell sx={{ width: 60 }}>
                  <IconButton
                    color="primary"
                    sx={{
                      border: '1px dashed',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                    onClick={() => openSlotModal(key)}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Modal
        okText="Add slot"
        open={slotModalState.isOpen}
        title="Add time slot"
        onClose={closeSlotModal}
        onOk={handleSlotModalSubmit}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TimePicker
            ampm={false}
            label="From"
            openTo="hours"
            value={slotModalState.from}
            onChange={(time) =>
              setSlotModalState((prev) => {
                const nextFrom = normalizeToHour(time)

                return {
                  ...prev,
                  from: nextFrom,
                  to: nextFrom ? nextFrom.add(1, 'hour') : null,
                  error: null,
                }
              })
            }
          />

          <TimePicker
            ampm={false}
            label="To"
            minTime={slotModalState.from ?? undefined}
            openTo="hours"
            value={slotModalState.to}
            onChange={(time) =>
              setSlotModalState((prev) => ({
                ...prev,
                to: normalizeToHour(time),
                error: null,
              }))
            }
          />

          {slotModalState.error && (
            <Typography color="error" variant="body2">
              {slotModalState.error}
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  )
}
