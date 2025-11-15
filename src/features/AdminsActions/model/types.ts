export interface CreateAdminFormValues {
  tenant?: string
  username: string
  password: string
  is_superuser: boolean
  clinic_id?: string
}

export interface CreateAdminFormProps {
  onClose: () => void
}
