import { ReducerLoadingState } from '@shared/types'

export interface DocumentsState {
  documents: GetDocumentsResponse['items']
  documentsStatus: ReducerLoadingState

  documentById: GetDocumentByIdResponse | null
  documentByIdStatus: ReducerLoadingState
}

export interface GetDocumentsResponse {
  items: []
  total: number
  page: number
  per_page: number
}

export interface GetDocumentByIdResponse {
  id: string
  clinic_id: string
  name: string
  s3_link: string
  chunk: string
  created_at: string
  updated_at: string
}

export interface CreateDocumentPayload {
  name: string
  file: File
  clinic_id?: string
}
