export interface CreateAdminFormValues {
  tenant: string
  username: string
  password: string
  is_superuser: boolean
  clinic?: string
}

export interface CreateAdminFormProps {
  onClose: () => void
}
