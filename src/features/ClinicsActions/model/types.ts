export interface CreateClinicFormValues {
  tenant: string
  username: string
  password: string
  is_superuser: boolean
  clinic_id?: string
}

export interface CreateClinicFormProps {
  onClose: () => void
}
