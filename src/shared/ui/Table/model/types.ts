import { DataGridProps, GridRenderCellParams } from '@mui/x-data-grid'

export type TableProps = DataGridProps & {
  isSingleSelection?: boolean
  multilineRow?: boolean
}

export type ExtraLabels = {
  successLabel?: string
  unSuccessLabel?: string
}

export type RenderCellParams = GridRenderCellParams & ExtraLabels

export enum TaskValues {
  All = 'ALL',
  Failed = 'FAILED',
  Success = 'SUCCESS',
  InProgress = 'IN_PROGRESS',
  Lost = 'LOST',
  Partial = 'PARTIAL',
  Canceled = 'CANCELED',
}
