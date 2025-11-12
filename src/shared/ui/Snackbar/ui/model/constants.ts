import { Severity } from './types'

export const DEFAULT_MESSAGE_MAP: Record<Severity, string> = {
  error: 'Unexpected error',
  warning: 'Unexpected warning',
  info: 'Unexpected info',
  success: 'Fetch successfully',
}
