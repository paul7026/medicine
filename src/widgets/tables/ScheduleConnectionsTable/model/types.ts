export interface EditScheduleConnectionFormValues {
  partner_token?: string
  user_token?: string
  login?: string
  password?: string
}

export interface EditScheduleConnectionFormProps {
  connectionId: string
  onClose: () => void
}
