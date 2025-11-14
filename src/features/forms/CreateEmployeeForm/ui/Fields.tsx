import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { GENDER_SELECT_ITEMS } from '../model/constants'
import { CreateEmployeeFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<CreateEmployeeFormValues>()

  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

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

      <SelectControl
        form={form}
        label="Gender *"
        name="gender"
        selectItems={GENDER_SELECT_ITEMS}
      />

      <TextFieldControl form={form} label="Email" name="email" />

      <TextFieldControl form={form} label="Phone" name="phone" />

      <TextFieldControl form={form} label="Position *" name="position" />

      <TextFieldControl
        form={form}
        label="Specialization *"
        name="specialization"
      />

      <TextFieldControl
        form={form}
        label="Work experience"
        name="work_experience"
      />

      <TextFieldControl
        form={form}
        label="Medical degree"
        name="medical_degree"
      />
    </Box>
  )
}
