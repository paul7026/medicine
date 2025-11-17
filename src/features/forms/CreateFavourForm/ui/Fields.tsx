import { InputAdornment } from '@mui/material'

import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { clinicsSelector, getClinicsApi } from '@entities/clinics'
import {
  favourCategoriesSelector,
  getFavourCategoriesApi,
} from '@entities/favourCategory'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { Box } from '@shared/ui/Box'
import { SelectControl } from '@shared/ui/Select'
import { SwitchControl } from '@shared/ui/Switch'
import { TextFieldControl } from '@shared/ui/TextField'

import { CURRENCY_OPTIONS } from '../model/constants'
import { CreateFavourFormValues, FieldsProps } from '../model/types'

export const Fields = ({ favourId, isMaintainer }: FieldsProps) => {
  const form = useFormContext<CreateFavourFormValues>()

  const { control, setValue } = form

  const { clinics, status: clinicsStatus } = useAppSelector(clinicsSelector)
  const { favourCategories, status: favourCategoriesStatus } = useAppSelector(
    favourCategoriesSelector
  )

  const clinicId = useWatch({ control, name: 'clinic_id' })

  const clinicsSelectList = clinics.map((clinic) => ({
    id: clinic.id,
    name: clinic.legal_name,
    value: clinic.id,
  }))

  const favourCategoriesSelectList = favourCategories.map((fc) => ({
    id: fc.id,
    name: fc.title,
    value: fc.id,
  }))

  const isClinicsEmpty = clinicsSelectList.length === 0
  const isFavCategoriesEmpty = favourCategoriesSelectList.length === 0

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getClinicsApi())
  }, [setValue, dispatch])

  useEffect(() => {
    if (!clinicId) {
      return
    }

    dispatch(getFavourCategoriesApi(`clinic_id=${clinicId}`))

    setValue('favour_category_id', '')
  }, [clinicId, dispatch, setValue])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {isMaintainer && !favourId && (
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

      <TextFieldControl form={form} label="Title *" name="title" />

      <SelectControl
        fullWidth
        disabled={isFavCategoriesEmpty}
        form={form}
        label={
          isFavCategoriesEmpty
            ? 'Favour category is empty *'
            : 'Favour category *'
        }
        loading={favourCategoriesStatus === 'pending'}
        name="favour_category_id"
        selectItems={favourCategoriesSelectList}
      />

      <TextFieldControl form={form} label="Comment" name="comment" />

      <TextFieldControl
        form={form}
        label="Duration"
        name="duration"
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">min</InputAdornment>,
          },
        }}
      />

      <SwitchControl form={form} label="Online" name="online_switch_on" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 0.6fr',
          gap: 2,
        }}
      >
        <TextFieldControl
          fullWidth
          form={form}
          label="Price"
          name="price"
          type="number"
        />

        <AutocompleteControl
          freeSolo
          fullWidth
          form={form}
          label="Currency"
          name="currency"
          options={CURRENCY_OPTIONS}
        />
      </Box>
    </Box>
  )
}
