import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { CreateFavourCategoryFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<CreateFavourCategoryFormValues>()

  const { setValue } = form

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const isClinicsEmpty = clinicsSelectList.length === 0

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [setValue, dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SelectControl
        fullWidth
        disabled={isClinicsEmpty}
        form={form}
        label={isClinicsEmpty ? 'Clinic is empty *' : 'Clinic *'}
        loading={clinicsStatus === 'pending'}
        name="clinic_id"
        selectItems={clinicsSelectList}
      />

      <TextFieldControl form={form} label="Title *" name="title" />

      <TextFieldControl form={form} label="Description" name="description" />
    </Box>
  )
}
