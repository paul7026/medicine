import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'
import { employeesSelector, getEmployeesApi } from '@entities/employees'
import { favoursSelector, getFavoursApi } from '@entities/favours'
import { filialsSelector, getFilialsApi } from '@entities/filials'
import {
  getSlotsWIthQueryStrApi,
  slotsWIthQueryStrSelector,
} from '@entities/slots'
import { getUsersApi, usersSelector } from '@entities/users'

import { formatIsoString } from '@shared/helpers/formatIsoString'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { TextFieldControl } from '@shared/ui/TextField'

import { STATUS_SELECT_ITEMS } from '../model/constants'
import { CreateAppointmentFormValues, FieldsProps } from '../model/types'

export const Fields = ({ appointmentId, isMaintainer }: FieldsProps) => {
  const form = useFormContext<CreateAppointmentFormValues>()

  const { control, setValue } = form

  const selectedFavourId = useWatch({ control, name: 'favour_id' })
  const selectedFilialId = useWatch({ control, name: 'filial_id' })
  const selectedEmployeeId = useWatch({ control, name: 'employee_id' })

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)
  const { users, status: usersStatus } = useAppSelector(usersSelector)
  const { favours, status: favoursStatus } = useAppSelector(favoursSelector)
  const { filials, status: filialsStatus } = useAppSelector(filialsSelector)
  const { employees, status: employeesStatus } =
    useAppSelector(employeesSelector)
  const { slotsWIthQueryStr, status: slotsStatus } = useAppSelector(
    slotsWIthQueryStrSelector
  )

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const usersSelectList = users.map((user) => ({
    id: user.id,
    name: user.name,
    value: user.id,
  }))

  const favoursSelectList = favours.map((favour) => ({
    id: favour.id,
    name: favour.title,
    value: favour.id,
  }))

  const filialsSelectList = filials.map((filial) => ({
    id: filial.id,
    name: filial.name,
    value: filial.id,
  }))

  const employeesSelectList = employees.map((employee) => ({
    id: employee.id,
    name: employee.name,
    value: employee.id,
  }))

  const slotsSelectList = slotsWIthQueryStr.map((slot) => ({
    id: slot.id,
    name: `${formatIsoString(slot.start_time)} - ${formatIsoString(slot.end_time)}`,
    value: slot.id,
  }))

  const isClinicsEmpty = clinicsSelectList.length === 0
  const isUsersEmpty = users.length === 0
  const isFavoursEmpty = favours.length === 0
  const isFilialsEmpty = filials.length === 0
  const isEmployeesEmpty = employees.length === 0
  const isSlotsEmpty = slotsWIthQueryStr.length === 0

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
    dispatch(getUsersApi())
    dispatch(getFavoursApi())
  }, [dispatch])

  useEffect(() => {
    setValue('filial_id', '')
    setValue('employee_id', '')
    setValue('slot_id', '')

    if (selectedFavourId) {
      dispatch(getFilialsApi(`favour_id=${selectedFavourId}`))
    }
  }, [setValue, selectedFavourId, dispatch])

  useEffect(() => {
    setValue('employee_id', '')
    setValue('slot_id', '')

    if (selectedFilialId && selectedFavourId) {
      dispatch(
        getEmployeesApi(
          `favour_id=${selectedFavourId}&filial_id=${selectedFilialId}`
        )
      )
    }
  }, [setValue, selectedFilialId, selectedFavourId, dispatch])

  useEffect(() => {
    setValue('slot_id', '')

    if (selectedEmployeeId && selectedFilialId && selectedFavourId) {
      dispatch(
        getSlotsWIthQueryStrApi(
          `favour_id=${selectedFavourId}&filial_id=${selectedFilialId}&employee_id=${selectedEmployeeId}`
        )
      )
    }
  }, [
    setValue,
    selectedFilialId,
    selectedFavourId,
    dispatch,
    selectedEmployeeId,
  ])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {isMaintainer && !appointmentId && (
        <SelectControl
          fullWidth
          disabled={isClinicsEmpty}
          form={form}
          label={isClinicsEmpty ? 'Clinic is empty *' : 'Clinic *'}
          loading={clinicsStatus === 'pending'}
          name="clinic_id"
          selectItems={clinicsSelectList}
        />
      )}
      {!appointmentId && (
        <SelectControl
          fullWidth
          disabled={isUsersEmpty}
          form={form}
          label={isUsersEmpty ? 'User is empty *' : 'User *'}
          loading={usersStatus === 'pending'}
          name="user_id"
          selectItems={usersSelectList}
        />
      )}

      <SelectControl
        fullWidth
        form={form}
        label="Status *"
        name="status"
        selectItems={STATUS_SELECT_ITEMS}
      />

      <TextFieldControl form={form} label="Contact" name="contact" />

      <SelectControl
        fullWidth
        disabled={isFavoursEmpty}
        form={form}
        label={isFavoursEmpty ? 'Favour is empty *' : 'Favour *'}
        loading={favoursStatus === 'pending'}
        name="favour_id"
        selectItems={favoursSelectList}
      />

      <SelectControl
        fullWidth
        disabled={isFilialsEmpty || !selectedFavourId}
        form={form}
        label={isFilialsEmpty ? 'Filial is empty *' : 'Filial *'}
        loading={filialsStatus === 'pending'}
        name="filial_id"
        selectItems={filialsSelectList}
      />

      <SelectControl
        fullWidth
        disabled={isEmployeesEmpty || !selectedFavourId || !selectedFilialId}
        form={form}
        label={isEmployeesEmpty ? 'Employees is empty' : 'Employees'}
        loading={employeesStatus === 'pending'}
        name="employee_id"
        selectItems={employeesSelectList}
      />

      <SelectControl
        fullWidth
        disabled={
          isSlotsEmpty ||
          !selectedFavourId ||
          !selectedFilialId ||
          !selectedEmployeeId
        }
        form={form}
        label={isSlotsEmpty ? 'Slots is empty *' : 'Slots *'}
        loading={slotsStatus === 'pending'}
        name="slot_id"
        selectItems={slotsSelectList}
      />
    </Box>
  )
}
