export interface EditAdminFormValues {
  username: string
  password: string
  is_superuser: boolean
}

export interface EditAdminFormProps {
  onClose: () => void
}
