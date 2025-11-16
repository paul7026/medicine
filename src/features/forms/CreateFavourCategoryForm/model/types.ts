import { GridRowId } from '@mui/x-data-grid'

export interface CreateFavourCategoryFormProps {
  categoryId?: GridRowId | null
  onClose: () => void
}

export interface CreateFavourCategoryFormValues {
  title: string
  description?: string
  clinic_id?: string
}

export interface FieldsProps {
  isMaintainer: boolean
  categoryId?: GridRowId | null
}
