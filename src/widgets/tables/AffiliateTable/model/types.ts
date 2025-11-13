export interface EditUserFormValues {
  username: string
  password: string
  is_superuser: boolean
}

export interface EditUserFormProps {
  onClose: () => void
}
