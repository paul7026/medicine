import { SxProps, Theme } from '@mui/material'

import { Dispatch, ReactNode, SetStateAction } from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface ModalStepperProps<T extends FieldValues> {
  form?: UseFormReturn<T, unknown, undefined>
  activeStep: number
  children: ReactNode
  steps: string[]
  sx?: SxProps<Theme>
  submitBtnTitle?: string
  setActiveStep: Dispatch<SetStateAction<number>>
  onSubmit: () => void
  onClose: () => void
}
