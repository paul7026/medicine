export interface CreateFilialFormValues {
  clinic_id?: string
  name: string
  address: string
  timezone?: string
  address_data?: string
  phones?: string
  description?: string
  social_media?: string
  email?: string
}

export interface CreateFilialFormProps {
  onClose: () => void
}

export interface FieldsProps {
  isMaintainer: boolean
}
