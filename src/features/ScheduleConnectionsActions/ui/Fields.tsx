import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { TYPE_SELECT_ITEMS } from '../model/constants'
import { CreateScheduleConnectionFormValues } from '../model/types'

interface FieldsProps {
  isMaintainer: boolean
}

export const Fields = ({ isMaintainer }: FieldsProps) => {
  const form = useFormContext<CreateScheduleConnectionFormValues>()
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

      <SelectControl
        fullWidth
        form={form}
        label="Type *"
        name="type"
        selectItems={TYPE_SELECT_ITEMS}
      />

      <TextFieldControl
        form={form}
        label="Partner token"
        name="partner_token"
      />

      <TextFieldControl form={form} label="User token" name="user_token" />

      <TextFieldControl form={form} label="Login" name="login" />

      <TextFieldControl
        form={form}
        label="Password"
        name="password"
        type="password"
      />
    </Box>
  )
}
