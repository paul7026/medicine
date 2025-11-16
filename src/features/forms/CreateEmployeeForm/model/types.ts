import { GridRowId } from '@mui/x-data-grid'

export interface CreateEmployeeFormProps {
  employeeId?: GridRowId | null
  onClose: () => void
}

export interface CreateEmployeeFormValues {
  name: string
  gender: string
  email?: string
  phone?: string
  position: string
  specialization: string
  work_experience?: number
  medical_degree?: string
  clinic_id?: string
}

export interface FieldsProps {
  isMaintainer: boolean
  employeeId?: GridRowId | null
}
