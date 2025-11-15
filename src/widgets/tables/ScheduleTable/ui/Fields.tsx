import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { DatePickerControl } from '@shared/ui/DatePicker'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'

import { ScheduleFiltersFormValues } from '../model/formTypes'

export const Fields = () => {
  const form = useFormContext<ScheduleFiltersFormValues>()

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [dispatch])

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const formatSelectList = [
    { id: '1', name: 'Online', value: 'online' },
    { id: '2', name: 'Offline', value: 'offline' },
  ]

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
      <SelectControl
        fullWidth
        form={form}
        label="Clinic"
        loading={clinicsStatus === 'pending'}
        name="clinic_id"
        selectItems={clinicsSelectList}
      />

      <DatePickerControl
        form={form}
        label="Start time"
        name="start_time"
        slotProps={{ textField: { fullWidth: true } }}
      />

      <DatePickerControl
        form={form}
        label="End time"
        name="end_time"
        slotProps={{ textField: { fullWidth: true } }}
      />

      <SelectControl
        fullWidth
        form={form}
        label="Format"
        name="format"
        selectItems={formatSelectList}
      />

      <SwitchControl form={form} label="Is available" name="is_available" />
    </Box>
  )
}
