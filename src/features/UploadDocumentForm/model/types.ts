export interface UploadDocumentFormProps {
  onClose: () => void
}

export interface UploadDocumentFormValues {
  name: string
  file: File | null
  clinic_id?: string
}

export interface FieldsProps {
  isMaintainer: boolean
}
