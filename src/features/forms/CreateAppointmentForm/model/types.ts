import { GridRowId } from '@mui/x-data-grid'

export interface CreateAppointmentFormProps {
  appointmentId?: GridRowId | null
  onClose: () => void
}

export interface CreateAppointmentFormValues {
  clinic_id?: string
  user_id?: string
  status: string
  contact?: string
  favour_id: string
  filial_id: string
  employee_id?: string
  slot_id: string
}

export interface FieldsProps {
  isMaintainer: boolean
  appointmentId?: GridRowId | null
}
