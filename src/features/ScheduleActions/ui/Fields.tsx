import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { DatePickerControl } from '@shared/ui/DatePicker'
import { SelectControl } from '@shared/ui/Select'

import { SlotsFormValues } from '../model/types'

interface FieldsProps {
  isMaintainer: boolean
}

export const Fields = ({ isMaintainer }: FieldsProps) => {
  const form = useFormContext<SlotsFormValues>()
  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.title,
    value: clinic.id,
  }))

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isMaintainer) {
      dispatch(getClinicsApi())
    }
  }, [dispatch, isMaintainer])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {isMaintainer && (
        <SelectControl
          fullWidth
          form={form}
          label="Clinic *"
          loading={status === 'pending'}
          name="clinic_id"
          selectItems={clinicsSelectList}
        />
      )}

      <DatePickerControl form={form} label="From date *" name="from_date" />

      <DatePickerControl form={form} label="To date *" name="to_date" />
    </Box>
  )
}
