import { ReducerLoadingState } from '@shared/types'

export interface ClinicsState {
  clinics: GetClinicsResponse['items']
  clinicsStatus: ReducerLoadingState

  clinicById: ClinicById | null
  clinicByIdStatus: ReducerLoadingState
}

export interface GetClinicsResponse {
  items: {
    id: string
    title: string
    legal_name: string
    managed_by: string
  }[]
  total: number
  page: number
  per_page: number
}

export interface ClinicById {
  id: string
  external_id: string
  api_key_hash: string
  managed_by: string
  schedule_connection_id: string
  title: string
  website: string
  legal_name: string
  legal_address: string
  legal_data: {
    additionalProp1: object
  }
  phones: string
  email: string
  description: string
  created_at: string
  updated_at: string
  chatbot_connections: {
    id: string
    platform: string
    bot_token: string
    api_key: string
    webhook_url: string
  }[]
  filials: {
    id: string
    name: string
    address: string
    email: string
    phones: string
  }[]
}

export type GetClinicByIdPayload = ClinicById
