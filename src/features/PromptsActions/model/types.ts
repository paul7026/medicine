export interface CreatePromptFormValues {
  clinic_id: string
  name: string
  content?: string
}

export interface CreatePromptFormProps {
  onClose: () => void
}
