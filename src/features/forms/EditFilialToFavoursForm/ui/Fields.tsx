import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  allFavoursForFormSelector,
  getAllFavoursForFormApi,
} from '@entities/favours'

import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { useAppSelector } from '@shared/hooks/useAppSelector'
import { AutocompleteControl } from '@shared/ui/Autocomplete'
import { Box } from '@shared/ui/Box'

import { EditFilialToFavoursFormValues } from '../model/types'

export const Fields = () => {
  const { allFavoursForForm, status } = useAppSelector(
    allFavoursForFormSelector
  )

  const options = allFavoursForForm.map((favour) => ({
    id: favour.id,
    label: favour.title,
  }))

  const isEmptyFavours = options.length === 0

  const form = useFormContext<EditFilialToFavoursFormValues>()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllFavoursForFormApi())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <AutocompleteControl
        multiple
        disabled={isEmptyFavours || status === 'pending'}
        form={form}
        label={isEmptyFavours ? 'No favours found' : 'Favours'}
        loading={status === 'pending'}
        name="favours"
        options={options}
      />
    </Box>
  )
}
