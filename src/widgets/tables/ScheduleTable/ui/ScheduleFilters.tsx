import FilterListIcon from '@mui/icons-material/FilterList'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Box } from '@shared/ui/Box'
import { Button } from '@shared/ui/Button'

import { Fields } from './Fields'

import { ScheduleFiltersFormValues } from '../model/formTypes'
import { ScheduleFilters } from '../model/types'

interface ScheduleFiltersProps {
  filters: ScheduleFilters
  onFiltersChange: (filters: ScheduleFilters) => void
  onReset: () => void
}

export const ScheduleFiltersComponent = ({
  filters,
  onFiltersChange,
  onReset,
}: ScheduleFiltersProps) => {
  const [expanded, setExpanded] = useState(false)

  const form = useForm<ScheduleFiltersFormValues>({
    defaultValues: {
      clinic_id: filters.clinic_id || '',
      start_time: filters.start_time ? dayjs(filters.start_time) : null,
      end_time: filters.end_time ? dayjs(filters.end_time) : null,
      format: filters.format || '',
      is_available: filters.is_available ?? true,
    },
    reValidateMode: 'onChange',
  })

  const { handleSubmit, reset } = form

  useEffect(() => {
    reset({
      clinic_id: filters.clinic_id || '',
      start_time: filters.start_time ? dayjs(filters.start_time) : null,
      end_time: filters.end_time ? dayjs(filters.end_time) : null,
      format: filters.format || '',
      is_available: filters.is_available ?? true,
    })
  }, [filters, reset])

  const onSubmit = (data: ScheduleFiltersFormValues) => {
    const appliedFilters: ScheduleFilters = {
      ...(data.clinic_id && { clinic_id: data.clinic_id }),
      ...(data.filial_id && { filial_id: data.filial_id }),
      ...(data.employee_id && { employee_id: data.employee_id }),
      ...(data.start_time && {
        start_time: data.start_time.format('YYYY-MM-DD'),
      }),
      ...(data.end_time && { end_time: data.end_time.format('YYYY-MM-DD') }),
      ...(data.format && { format: data.format }),
      ...(data.is_available !== undefined && {
        is_available: data.is_available,
      }),
    }

    onFiltersChange(appliedFilters)
  }

  const handleReset = () => {
    reset({
      clinic_id: '',
      filial_id: '',
      employee_id: '',
      start_time: null,
      end_time: null,
      format: '',
      is_available: false,
    })
    onReset()
  }

  return (
    <Accordion
      expanded={expanded}
      onChange={(_, isExpanded) => setExpanded(isExpanded)}
    >
      <AccordionSummary expandIcon={<FilterListIcon />}>
        Filters
      </AccordionSummary>
      <AccordionDetails>
        <FormProvider {...form}>
          <form id="schedule-filters-form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Fields />

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button type="button" variant="outlined" onClick={handleReset}>
                  Reset
                </Button>
                <Button type="submit" variant="contained">
                  Apply
                </Button>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </AccordionDetails>
    </Accordion>
  )
}
