export interface CreateScheduleConnectionFormValues {
  type: string
  clinic_id?: string
  partner_token?: string
  user_token?: string
  login?: string
  password?: string
}

export interface CreateScheduleConnectionFormProps {
  onClose: () => void
}
