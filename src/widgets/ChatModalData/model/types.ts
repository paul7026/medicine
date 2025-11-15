export interface ChatModalDataProps {
  chatId: string
  onClose: () => void
}

export interface InterceptReturnButtonProps {
  chatId: string
  currentIntent: number
}
