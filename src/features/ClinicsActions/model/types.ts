export interface CreateClinicFormValues {
  title: string
  legal_name: string
  managed_by: string
  website?: string
  legal_address?: string
  phones?: string
  email?: string
  description?: string
}

export interface CreateClinicFormProps {
  onClose: () => void
}
