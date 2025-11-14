import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { CreateFilialFormValues } from '../model/types'

export const Fields = () => {
  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const form = useFormContext<CreateFilialFormValues>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SelectControl
        fullWidth
        form={form}
        label="Clinic *"
        loading={status === 'pending'}
        name="clinic_id"
        selectItems={clinicsSelectList}
      />

      <TextFieldControl form={form} label="Name *" name="name" />

      <TextFieldControl form={form} label="Timezone" name="timezone" />

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
