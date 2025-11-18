import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  allFilialsForFormSelector,
  getAllFilialsForFormApi,
} from '@entities/filials'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { Box } from '@shared/ui/Box'

import { EditFavourToFilialsFormValues } from '../model/types'

export const Fields = () => {
  const { allFilialsForForm, status } = useAppSelector(
    allFilialsForFormSelector
  )

  const options = allFilialsForForm.map((filial) => ({
    id: filial.id,
    label: filial.name,
  }))

  const isEmptyFilial = options.length === 0

  const form = useFormContext<EditFavourToFilialsFormValues>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllFilialsForFormApi())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AutocompleteControl
        fullWidth
        multiple
        form={form}
        label={isEmptyFilial ? 'No filials found' : 'Filials'}
        loading={status === 'pending'}
        name="filials"
        options={options}
      />
    </Box>
  )
}
