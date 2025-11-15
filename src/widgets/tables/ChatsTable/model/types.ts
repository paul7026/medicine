export interface EditChatsFormValues {
  message: string
}

export interface EditChatsFormProps {
  chatId: string
  onClose: () => void
}
