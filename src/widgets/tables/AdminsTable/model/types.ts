import { Admin } from '@entities/admins'

export interface EditAdminFormValues {
  username: string
  password: string
  is_superuser: boolean
}

export interface EditAdminFormProps {
  admin: Admin
  onClose: () => void
}
