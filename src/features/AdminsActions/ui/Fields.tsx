import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { TENANT_SELECT_ITEMS } from '../model/constants'
import { CreateAdminFormValues } from '../model/types'

interface FieldsProps {
  isMaintainer: boolean
}

export const Fields = ({ isMaintainer }: FieldsProps) => {
  const { clinics, status } = useAppSelector(clinicsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const form = useFormContext<CreateAdminFormValues>()

  const { control } = form

  const tenant = useWatch({ control, name: 'tenant' })

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
          label="Tenant *"
          name="tenant"
          selectItems={TENANT_SELECT_ITEMS}
        />
      )}

      {isMaintainer && tenant !== 'panacea' && (
        <SelectControl
          fullWidth
          disabled={!tenant}
          form={form}
          label="Clinic"
          loading={status === 'pending'}
          name="clinic_id"
          selectItems={clinicsSelectList}
        />
      )}

      <TextFieldControl form={form} label="Username *" name="username" />

      <TextFieldControl
        form={form}
        label="Password *"
        name="password"
        type="password"
      />

      <SwitchControl form={form} label="Is superuser" name="is_superuser" />
    </Box>
  )
}
