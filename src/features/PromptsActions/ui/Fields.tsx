import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { CreatePromptFormValues } from '../model/types'

export const Fields = () => {
  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const form = useFormContext<CreatePromptFormValues>()

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

      <TextFieldControl
        multiline
        form={form}
        label="Content"
        name="content"
        rows={6}
      />
    </Box>
  )
}
