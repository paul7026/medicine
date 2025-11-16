import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { TIMEZONE_SELECT_ITEMS } from '../model/constants'
import { CreateFilialFormValues, FieldsProps } from '../model/types'

export const Fields = ({ isMaintainer }: FieldsProps) => {
  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.title,
    value: clinic.id,
  }))

  const form = useFormContext<CreateFilialFormValues>()

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

      <TextFieldControl form={form} label="Name *" name="name" />

      <SelectControl
        fullWidth
        form={form}
        label="Timezone"
        name="timezone"
        selectItems={TIMEZONE_SELECT_ITEMS}
      />

      <TextFieldControl form={form} label="Address *" name="address" />

      <TextFieldControl form={form} label="Address data" name="address_data" />

      <TextFieldControl form={form} label="Phones" name="phones" />

      <TextFieldControl form={form} label="Email" name="email" type="email" />

      <TextFieldControl form={form} label="Social media" name="social_media" />

      <TextFieldControl
        multiline
        form={form}
        label="Description"
        name="description"
        rows={4}
      />
    </Box>
  )
}
