export interface EditUserFormValues {
  name: string
  country: string
  date_of_birth: string
  height: string
  weight: string
  gender: string
  goal: string
  custom_goal: string
  complaints: string[]
  custom_complaint: string
  is_onboarded: boolean
}

export interface EditUserFormProps {
  onClose: () => void
  userId: string
}
