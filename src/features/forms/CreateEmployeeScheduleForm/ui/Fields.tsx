import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'
import { employeesSelector, getEmployeesApi } from '@entities/employees'
import { filialsSelector, getFilialsApi } from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'

import { CreateEmployeeScheduleFormValues } from '../model/types'

export const Fields = () => {
  const form = useFormContext<CreateEmployeeScheduleFormValues>()

  const { control, setValue } = form

  const selectedClinicId = useWatch({ control, name: 'clinic' })
  const prevClinicIdRef = useRef<string | undefined>(undefined)

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)
  const { employees, status: employeesStatus } =
    useAppSelector(employeesSelector)
  const { filials, status: filialsStatus } = useAppSelector(filialsSelector)

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const employeesSelectList = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    value: employee.id,
  }))

  const filialsSelectList = filials.map((filial) => ({
    id: filial.id,
    name: filial.name,
    value: filial.id,
  }))

  const isClinicsEmpty = clinicsSelectList.length === 0
  const isEmployeesEmpty = employees.length === 0
  const isFilialsEmpty = filials.length === 0

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [dispatch])

  useEffect(() => {
    // Only clear employee and filial if the clinic actually changed
    if (
      prevClinicIdRef.current !== undefined &&
      prevClinicIdRef.current !== selectedClinicId
    ) {
      setValue('employee', '')
      setValue('filial', '')
    }

    prevClinicIdRef.current = selectedClinicId

    if (selectedClinicId) {
      dispatch(getEmployeesApi(`clinic_id=${selectedClinicId}`))
      dispatch(getFilialsApi(`clinic_id=${selectedClinicId}`))
    }
  }, [setValue, selectedClinicId, dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <SelectControl
        fullWidth
        disabled={isClinicsEmpty}
        form={form}
        label={isClinicsEmpty ? 'Clinic is empty *' : 'Clinic *'}
        loading={clinicsStatus === 'pending'}
        name="clinic"
        selectItems={clinicsSelectList}
      />

      <SelectControl
        fullWidth
        disabled={isEmployeesEmpty || !selectedClinicId}
        form={form}
        label={isEmployeesEmpty ? 'Employee is empty *' : 'Employee *'}
        loading={employeesStatus === 'pending'}
        name="employee"
        selectItems={employeesSelectList}
      />

      <SelectControl
        fullWidth
        disabled={isFilialsEmpty || !selectedClinicId}
        form={form}
        label={isFilialsEmpty ? 'Filial is empty *' : 'Filial *'}
        loading={filialsStatus === 'pending'}
        name="filial"
        selectItems={filialsSelectList}
      />
    </Box>
  )
}
