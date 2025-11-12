import { SetStateAction } from 'react'

export type ReducerLoadingState = 'idle' | 'pending' | 'succeeded' | 'failed'

export type ErrorResponse = {
  code: string
  message: string
  response: {
    status: number
    statusText: string
    data: {
      errors: {
        code: string
        detail: string
        msg_key: string
        non_field_errors: string
        [key: string]: string
      }[]
    }
  }
}

export type AccordionArrProps = {
  rowTitle: string
  rowValue: string | number
  edit: boolean
  tooltipTitle?: string
  setModal?: (value: SetStateAction<boolean>) => void
}

export type OptionsName =
  | 'cluster'
  | 'resource_pool'
  | 'limit'
  | 'name'
  | 'entity'
  | 'username'
  | 'security_users'
  | 'node'
  | 'shared_storage'

export type AddOptionsToUrlProps = {
  [option in OptionsName]?: string
}
