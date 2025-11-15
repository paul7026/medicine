export interface CreateScheduleConnectionFormValues {
  clinic_id: string
  type: string
  partner_token?: string
  user_token?: string
  login?: string
  password?: string
}

export interface CreateScheduleConnectionFormProps {
  onClose: () => void
}
