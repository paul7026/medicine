import { GridRowId } from '@mui/x-data-grid'

export interface CreateFavourFormProps {
  favourId?: GridRowId | null
  onClose: () => void
}

export interface CreateFavourFormValues {
  title: string
  favour_category_id: string
  comment?: string
  duration?: number
  online_switch_on?: boolean
  price?: number
  currency?: string
  clinic_id?: string
}

export interface FieldsProps {
  isMaintainer: boolean
  favourId?: GridRowId | null
}
