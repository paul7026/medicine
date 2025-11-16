export interface EditFilialFormValues {
  name: string
  address: string
  timezone?: string
  address_data?: string
  phones?: string
  description?: string
  social_media?: string
  email?: string
}

export interface EditFilialFormProps {
  filialId: string
  onClose: () => void
}
