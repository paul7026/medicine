import dayjs from 'dayjs'

export interface SlotsFormValues {
  from_date: dayjs.Dayjs | null
  to_date: dayjs.Dayjs | null
  clinic_id?: string
}

export interface SlotsFormProps {
  onClose: () => void
}
