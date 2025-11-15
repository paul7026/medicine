export interface FavourModalDataProps {
  favourId: string
}

interface ModalData {
  title: string
  formId: string
}

export type FavourModalValues = 'changeFilials' | 'changeEmployees'

export type ModalValues = Record<FavourModalValues, ModalData>
